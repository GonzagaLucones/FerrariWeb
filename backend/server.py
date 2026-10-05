import os
from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Ferrari Site API")
api = APIRouter(prefix="/api")


@api.get("/")
def health():
    return {"status": "ok", "app": "ferrari-site"}


app.include_router(api)
