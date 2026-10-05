import os
import json
import uuid
from datetime import datetime, timezone

from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from dotenv import load_dotenv
import httpx

load_dotenv()

app = FastAPI(title="Ferrari Site API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

api = APIRouter(prefix="/api")

GEMINI_API_KEY = os.environ["GEMINI_API_KEY"]
GEMINI_MODEL = os.environ.get("GEMINI_MODEL", "gemini-3.5-flash")
GEMINI_FALLBACK_MODEL = os.environ.get(
    "GEMINI_FALLBACK_MODEL",
    "gemini-3-flash-preview"
)

# Sessões temporárias em memória.
# Não usamos banco de dados.
chat_sessions = {}

SYSTEM_PROMPT = (
    "Você é o concierge virtual da Ferrari, representado pelo Cavallino Rampante. "
    "Fale com elegância, paixão e precisão, no tom da marca: "
    "'Built with obsession. Driven with purpose. Remembered forever.' "
    "Responda no idioma do usuário (padrão português do Brasil). "
    "Seja conciso (no máximo 3 parágrafos curtos), "
    "ajude com dúvidas sobre a Ferrari, seus modelos, história, Maranello, "
    "Fórmula 1, test-drive e sobre o conteúdo deste site. "
    "Nunca invente preços exatos; sugira contato com um concessionário oficial "
    "para valores e disponibilidade."
)


class ChatRequest(BaseModel):
    session_id: str
    message: str


def _now():
    return datetime.now(timezone.utc).isoformat()


def _history(session_id: str, limit: int = 20):
    return chat_sessions.get(session_id, [])[-limit:]


@api.get("/")
def health():
    return {
        "status": "ok",
        "app": "ferrari-site"
    }


@api.get("/chat/{session_id}/messages")
async def get_messages(session_id: str):
    return _history(session_id, limit=50)


@api.post("/chat")
async def chat(req: ChatRequest):
    text = req.message.strip()

    if not text:
        raise HTTPException(
            status_code=400,
            detail="Mensagem vazia"
        )

    history = _history(req.session_id)

    contents = [
        {
            "role": "model" if m["role"] == "assistant" else "user",
            "parts": [{"text": m["content"]}]
        }
        for m in history
    ]

    contents.append({
        "role": "user",
        "parts": [{"text": text}]
    })

    body = {
        "systemInstruction": {
            "parts": [{"text": SYSTEM_PROMPT}]
        },
        "contents": contents,
        "generationConfig": {
            "thinkingConfig": {
                "thinkingBudget": 0
            },
            "maxOutputTokens": 800
        },
    }

    async def gemini_stream(model: str):
        url = (
            "https://generativelanguage.googleapis.com/"
            f"v1beta/models/{model}:streamGenerateContent?alt=sse"
        )

        async with httpx.AsyncClient(
            timeout=httpx.Timeout(60.0, connect=10.0)
        ) as client:

            async with client.stream(
                "POST",
                url,
                json=body,
                headers={
                    "x-goog-api-key": GEMINI_API_KEY
                },
            ) as resp:

                if resp.status_code != 200:
                    raise RuntimeError(
                        f"HTTP {resp.status_code}: "
                        f"{(await resp.aread())[:200]!r}"
                    )

                async for line in resp.aiter_lines():

                    if not line.startswith("data:"):
                        continue

                    chunk = json.loads(
                        line[5:].strip()
                    )

                    for cand in chunk.get("candidates", []):

                        for part in cand.get(
                            "content", {}
                        ).get("parts", []):

                            if (
                                part.get("text")
                                and not part.get("thought")
                            ):
                                yield part["text"]

    chat_sessions.setdefault(
        req.session_id,
        []
    ).append({
        "id": str(uuid.uuid4()),
        "session_id": req.session_id,
        "role": "user",
        "content": text,
        "created_at": _now(),
    })

    async def event_stream():

        full = []

        for model in (
            GEMINI_MODEL,
            GEMINI_FALLBACK_MODEL
        ):

            try:

                async for delta in gemini_stream(model):

                    full.append(delta)

                    yield (
                        f"data: {json.dumps({'delta': delta})}\n\n"
                    )

                break

            except Exception as e:

                print(
                    f"chat error ({model}):",
                    str(e)[:200]
                )

                if full:
                    break

                if model == GEMINI_FALLBACK_MODEL:

                    yield (
                        "data: "
                        + json.dumps({
                            "error":
                            "O Cavallino está em alta demanda agora. "
                            "Tente novamente em instantes."
                        })
                        + "\n\n"
                    )

        reply = "".join(full)

        if reply:

            chat_sessions.setdefault(
                req.session_id,
                []
            ).append({
                "id": str(uuid.uuid4()),
                "session_id": req.session_id,
                "role": "assistant",
                "content": reply,
                "created_at": _now(),
            })

        yield (
            f"data: {json.dumps({'done': True})}\n\n"
        )

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no"
        },
    )


app.include_router(api)
