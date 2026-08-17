import { reviewConfig, studioPhotoSlots, studioTextSlots } from '../content/review';

type Session = { ok: true; at: number; author: string };
type LibraryPhoto = { id: string; thumb: string; full: string };

const choices = new Map<string, LibraryPhoto>();

function readSession(): Session | null {
  try {
    const raw = localStorage.getItem(reviewConfig.sessionKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Session;
    if (!parsed?.ok) return null;
    if (Date.now() - parsed.at > reviewConfig.sessionTtlMs) return null;
    return parsed;
  } catch {
    return null;
  }
}

async function sha256Hex(value: string) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function authorName() {
  return (
    readSession()?.author ||
    localStorage.getItem(reviewConfig.authorKey) ||
    reviewConfig.defaultAuthor
  );
}

function setStatus(msg: string) {
  const el = document.getElementById('studio-status');
  if (el) el.textContent = msg;
}

function showLogin() {
  const wrap = document.createElement('div');
  wrap.style.cssText =
    'position:fixed;inset:0;background:rgba(28,25,23,.72);display:grid;place-items:center;z-index:50;padding:20px';
  wrap.innerHTML = `
    <form id="studio-login" style="width:min(400px,100%);background:#fff;border-radius:18px;padding:22px">
      <h1 style="margin:0 0 8px;font-size:22px">Agape change studio</h1>
      <p style="margin:0 0 14px;color:#57534e">Same review password. Changes go to Kyle — they do not publish themselves.</p>
      <label style="display:block;font-size:12px;font-weight:700;margin-bottom:6px">PASSWORD</label>
      <input id="studio-pass" type="password" style="width:100%;padding:12px;border:1px solid #d6d3d1;border-radius:12px;margin-bottom:12px" />
      <label style="display:block;font-size:12px;font-weight:700;margin-bottom:6px">YOUR NAME</label>
      <input id="studio-name" type="text" value="${authorName()}" style="width:100%;padding:12px;border:1px solid #d6d3d1;border-radius:12px;margin-bottom:12px" />
      <div id="studio-login-error" style="color:#b91c1c;min-height:1.2em;margin-bottom:8px"></div>
      <button type="submit" style="border:0;border-radius:999px;padding:10px 14px;background:#1c1917;color:#fff;font-weight:700">Open studio</button>
    </form>
  `;
  document.body.appendChild(wrap);
  wrap.querySelector('form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const pass = (document.getElementById('studio-pass') as HTMLInputElement).value.trim();
    const name = (document.getElementById('studio-name') as HTMLInputElement).value.trim() || reviewConfig.defaultAuthor;
    const hash = await sha256Hex(pass);
    if (hash !== reviewConfig.passwordHash) {
      const err = document.getElementById('studio-login-error');
      if (err) err.textContent = 'Wrong password.';
      return;
    }
    localStorage.setItem(
      reviewConfig.sessionKey,
      JSON.stringify({ ok: true, at: Date.now(), author: name }),
    );
    localStorage.setItem(reviewConfig.authorKey, name);
    wrap.remove();
  });
}

async function loadLibrary(): Promise<LibraryPhoto[]> {
  const res = await fetch(reviewConfig.photoLibraryUrl, { cache: 'no-store' });
  if (!res.ok) return [];
  const data = (await res.json()) as { photos?: LibraryPhoto[] };
  return data.photos ?? [];
}

function markSlot(id: string, photo: LibraryPhoto) {
  choices.set(id, photo);
  const btn = document.querySelector<HTMLButtonElement>(`.photo-slot[data-slot="${id}"]`);
  if (!btn) return;
  const img = btn.querySelector('img');
  const choice = btn.querySelector('[data-choice]');
  if (img) img.src = photo.thumb;
  if (choice) choice.textContent = `Use ${photo.id}`;
  btn.classList.add('changed');
}

function packageChanges() {
  const texts = studioTextSlots
    .map((slot) => {
      const el = document.getElementById(`text-${slot.id}`) as HTMLTextAreaElement | null;
      const next = el?.value.trim() ?? '';
      return next ? { id: slot.id, label: slot.label, from: slot.current, to: next } : null;
    })
    .filter(Boolean);
  const photos = [...choices.entries()].map(([id, photo]) => {
    const slot = studioPhotoSlots.find((s) => s.id === id);
    return {
      id,
      label: slot?.label ?? id,
      from: slot?.current ?? '',
      to: photo.full,
      thumb: photo.thumb,
    };
  });
  const extra = (document.getElementById('extra-notes') as HTMLTextAreaElement | null)?.value.trim() ?? '';
  return {
    kind: 'agape-studio-change-request',
    exportedAt: new Date().toISOString(),
    author: authorName(),
    page: location.href,
    photos,
    texts,
    extra,
  };
}

async function sendChanges() {
  const payload = packageChanges();
  if (!payload.photos.length && !payload.texts.length && !payload.extra) {
    alert('Pick a photo, change some text, or add a note first.');
    return;
  }
  setStatus('Sending…');
  const summary = [
    ...payload.photos.map((p) => `PHOTO ${p.label}: ${p.from} → ${p.to}`),
    ...payload.texts.map((t) => `TEXT ${t?.label}: ${t?.to}`),
    payload.extra ? `NOTE: ${payload.extra}` : '',
  ]
    .filter(Boolean)
    .join('\n');
  try {
    const res = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(reviewConfig.notifyEmail)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `Agape photo/text change request from ${payload.author}`,
          _template: 'table',
          _captcha: 'false',
          name: payload.author,
          email: reviewConfig.notifyEmail,
          message: summary,
          changes_json: JSON.stringify(payload),
        }),
      },
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    setStatus('Sent to Kyle. Nothing is live yet.');
    alert('Sent to Kyle. He’ll apply the changes — they are not live yet.');
  } catch {
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `agape-changes-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    setStatus('Email failed — downloaded the request instead.');
    alert('Could not email. A JSON file downloaded — text that to Kyle.');
  }
}

async function boot() {
  if (!readSession()) showLogin();
  const library = await loadLibrary();
  const dialog = document.getElementById('picker') as HTMLDialogElement | null;
  const grid = document.getElementById('picker-grid');
  const title = document.getElementById('picker-title');
  let activeSlot = '';

  document.querySelectorAll<HTMLButtonElement>('.photo-slot').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeSlot = btn.dataset.slot ?? '';
      if (title) title.textContent = `Choose a photo for ${btn.querySelector('.slot-label')?.textContent ?? 'this slot'}`;
      if (grid) {
        grid.innerHTML = library
          .map(
            (p) =>
              `<button type="button" data-id="${p.id}"><img src="${p.thumb}" alt="${p.id}" loading="lazy"></button>`,
          )
          .join('');
        grid.querySelectorAll<HTMLButtonElement>('button').forEach((pick) => {
          pick.addEventListener('click', () => {
            const photo = library.find((p) => p.id === pick.dataset.id);
            if (photo && activeSlot) markSlot(activeSlot, photo);
            dialog?.close();
          });
        });
      }
      dialog?.showModal();
    });
  });

  document.getElementById('picker-close')?.addEventListener('click', () => dialog?.close());
  document.getElementById('send-changes')?.addEventListener('click', () => void sendChanges());
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => void boot(), { once: true });
} else {
  void boot();
}
