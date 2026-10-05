(() => {
  const API_BASE = (window.FERRARI_API_BASE || '').replace(/\/$/, '');
  const STORAGE_KEY = 'ferrari_chat_session';

  function getSessionId() {
    let id = localStorage.getItem(STORAGE_KEY);
    if (!id) {
      id = (crypto.randomUUID && crypto.randomUUID()) || String(Date.now()) + Math.random().toString(16).slice(2);
      localStorage.setItem(STORAGE_KEY, id);
    }
    return id;
  }

  function horseSvg() {
    const src = document.querySelector('.header-horse svg');
    if (src) {
      const clone = src.cloneNode(true);
      clone.removeAttribute('class');
      clone.setAttribute('class', 'fc-horse-icon');
      clone.setAttribute('aria-hidden', 'true');
      return clone.outerHTML;
    }
    return '<svg class="fc-horse-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>';
  }

  const SUGGESTIONS = [
    'Qual é a história da Ferrari?',
    'Me fale sobre Maranello',
    'Como agendar um test-drive?',
  ];

  function build() {
    const launcher = document.createElement('button');
    launcher.className = 'fc-launcher';
    launcher.id = 'fc-launcher';
    launcher.setAttribute('aria-label', 'Abrir concierge Ferrari');
    launcher.setAttribute('data-testid', 'chat-launcher-button');
    launcher.innerHTML = horseSvg() +
      '<svg class="fc-close-icon" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

    const panel = document.createElement('section');
    panel.className = 'fc-panel';
    panel.id = 'fc-panel';
    panel.setAttribute('aria-label', 'Concierge Ferrari');
    panel.setAttribute('data-testid', 'chat-panel');
    panel.innerHTML = `
      <header class="fc-header">
        <div class="fc-header-badge">${horseSvg()}</div>
        <div>
          <div class="fc-header-title">Cavallino AI</div>
          <div class="fc-header-sub">Concierge Ferrari · Maranello</div>
        </div>
      </header>
      <div class="fc-messages" id="fc-messages" data-testid="chat-messages"></div>
      <div class="fc-suggestions" id="fc-suggestions">
        ${SUGGESTIONS.map((s, i) => `<button type="button" class="fc-chip" data-testid="chat-suggestion-${i}">${s}</button>`).join('')}
      </div>
      <form class="fc-form" id="fc-form">
        <input class="fc-input" id="fc-input" data-testid="chat-input" type="text" autocomplete="off" placeholder="Pergunte ao Cavallino..." maxlength="1000" />
        <button class="fc-send" id="fc-send" data-testid="chat-send-button" type="submit" aria-label="Enviar">
          <svg viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </form>`;

    document.body.appendChild(panel);
    document.body.appendChild(launcher);
    return { launcher, panel };
  }

  function init() {
    const { launcher, panel } = build();
    const messagesEl = panel.querySelector('#fc-messages');
    const suggestionsEl = panel.querySelector('#fc-suggestions');
    const form = panel.querySelector('#fc-form');
    const input = panel.querySelector('#fc-input');
    const sendBtn = panel.querySelector('#fc-send');
    const sessionId = getSessionId();
    let busy = false;
    let historyLoaded = false;

    function addMsg(role, text) {
      const el = document.createElement('div');
      el.className = `fc-msg ${role}`;
      el.setAttribute('data-testid', `chat-message-${role}`);
      el.textContent = text;
      messagesEl.appendChild(el);
      messagesEl.scrollTop = messagesEl.scrollHeight;
      return el;
    }

    function welcome() {
      addMsg('assistant', 'Benvenuto. Sou o concierge virtual da Ferrari. Como posso ajudar você hoje?');
    }

    async function loadHistory() {
      if (historyLoaded) return;
      historyLoaded = true;
      try {
        const res = await fetch(`${API_BASE}/api/chat/${sessionId}/messages`);
        const data = res.ok ? await res.json() : [];
        if (data.length) {
          data.forEach(m => addMsg(m.role, m.content));
          suggestionsEl.style.display = 'none';
        } else {
          welcome();
        }
      } catch (_) {
        welcome();
      }
    }

    function toggle(open) {
      const isOpen = open ?? !panel.classList.contains('open');
      panel.classList.toggle('open', isOpen);
      launcher.classList.toggle('open', isOpen);
      launcher.setAttribute('aria-label', isOpen ? 'Fechar concierge Ferrari' : 'Abrir concierge Ferrari');
      if (isOpen) {
        loadHistory();
        setTimeout(() => input.focus(), 250);
      }
    }

    async function send(text) {
      if (busy || !text.trim()) return;
      busy = true;
      sendBtn.disabled = true;
      suggestionsEl.style.display = 'none';
      addMsg('user', text);
      input.value = '';
      const bubble = addMsg('assistant', '');
      bubble.classList.add('typing');

      try {
        const res = await fetch(`${API_BASE}/api/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId, message: text }),
        });
        if (!res.ok || !res.body) throw new Error('bad response');
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let hadError = false;
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const parts = buffer.split('\n\n');
          buffer = parts.pop();
          for (const part of parts) {
            const line = part.trim();
            if (!line.startsWith('data:')) continue;
            const payload = JSON.parse(line.slice(5).trim());
            if (payload.delta) {
              bubble.textContent += payload.delta;
              messagesEl.scrollTop = messagesEl.scrollHeight;
            } else if (payload.error) {
              hadError = true;
              bubble.remove();
              addMsg('error', payload.error);
            }
          }
        }
        if (!hadError && !bubble.textContent) {
          bubble.remove();
          addMsg('error', 'Sem resposta no momento. Tente novamente.');
        }
      } catch (_) {
        bubble.remove();
        addMsg('error', 'Não foi possível falar com o Cavallino agora. Tente novamente.');
      } finally {
        bubble.classList.remove('typing');
        busy = false;
        sendBtn.disabled = false;
        input.focus();
      }
    }

    launcher.addEventListener('click', () => toggle());
    form.addEventListener('submit', (e) => { e.preventDefault(); send(input.value); });
    suggestionsEl.querySelectorAll('.fc-chip').forEach(chip => {
      chip.addEventListener('click', () => send(chip.textContent));
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && panel.classList.contains('open')) toggle(false);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
