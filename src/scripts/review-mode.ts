/**
 * Agape site review mode — password gate + text pins + freehand draw.
 * Loaded on every page; UI only appears after auth or on /review.
 */
import { reviewConfig } from '../content/review';

type Tool = 'note' | 'draw' | 'erase' | 'select';

type TextAnnotation = {
  id: string;
  type: 'text';
  x: number; // 0–1 of document width
  y: number; // 0–1 of document height
  text: string;
  author: string;
  color: string;
  createdAt: string;
  updatedAt: string;
};

type StrokeAnnotation = {
  id: string;
  type: 'stroke';
  points: Array<{ x: number; y: number }>; // normalized document coords
  color: string;
  width: number;
  author: string;
  createdAt: string;
};

type Annotation = TextAnnotation | StrokeAnnotation;

type Session = {
  ok: true;
  at: number;
  author: string;
};

const COLORS = ['#E85D04', '#1d4ed8', '#15803d', '#b45309', '#be123c', '#111827'];

let root: HTMLElement | null = null;
let layer: HTMLElement | null = null;
let svg: SVGSVGElement | null = null;
let listEl: HTMLElement | null = null;
let statusEl: HTMLElement | null = null;
let tool: Tool = 'note';
let color = COLORS[0];
let drawWidth = 3;
let annotations: Annotation[] = [];
let selectedId: string | null = null;
let drawing = false;
let currentStroke: StrokeAnnotation | null = null;
let drag: { id: string; dx: number; dy: number } | null = null;

function $(sel: string, el: ParentNode = document) {
  return el.querySelector(sel) as HTMLElement | null;
}

function uid() {
  return `a_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

async function sha256Hex(value: string) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function readSession(): Session | null {
  try {
    const raw = localStorage.getItem(reviewConfig.sessionKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Session;
    if (!parsed?.ok || !parsed.at) return null;
    if (Date.now() - parsed.at > reviewConfig.sessionTtlMs) {
      localStorage.removeItem(reviewConfig.sessionKey);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

const OPEN_KEY = 'agape-review-open';

function setReviewOpen(on: boolean) {
  // Session-only so the public homepage never keeps markup tools stuck open.
  try {
    if (on) sessionStorage.setItem(OPEN_KEY, '1');
    else sessionStorage.removeItem(OPEN_KEY);
  } catch {
    // ignore
  }
  // Clear the sticky localStorage flag from the first version.
  try {
    localStorage.removeItem(OPEN_KEY);
  } catch {
    // ignore
  }
}

function writeSession(author: string) {
  const session: Session = { ok: true, at: Date.now(), author };
  localStorage.setItem(reviewConfig.sessionKey, JSON.stringify(session));
  localStorage.setItem(reviewConfig.authorKey, author);
  setReviewOpen(true);
}

function clearSession() {
  localStorage.removeItem(reviewConfig.sessionKey);
  setReviewOpen(false);
}

function authorName() {
  return (
    readSession()?.author ||
    localStorage.getItem(reviewConfig.authorKey) ||
    reviewConfig.defaultAuthor
  );
}

function loadAnnotations() {
  try {
    const raw = localStorage.getItem(reviewConfig.storageKey);
    annotations = raw ? (JSON.parse(raw) as Annotation[]) : [];
  } catch {
    annotations = [];
  }
}

function saveAnnotations() {
  localStorage.setItem(reviewConfig.storageKey, JSON.stringify(annotations));
  renderAll();
  setStatus(`${annotations.length} note${annotations.length === 1 ? '' : 's'} saved on this device`);
}

function docSize() {
  const width = Math.max(
    document.documentElement.scrollWidth,
    document.body.scrollWidth,
    document.documentElement.clientWidth,
  );
  const height = Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight,
    document.documentElement.clientHeight,
  );
  return { width, height };
}

function eventToNorm(e: PointerEvent) {
  const { width, height } = docSize();
  const x = (e.clientX + window.scrollX) / width;
  const y = (e.clientY + window.scrollY) / height;
  return {
    x: Math.min(1, Math.max(0, x)),
    y: Math.min(1, Math.max(0, y)),
  };
}

function setStatus(msg: string) {
  if (statusEl) statusEl.textContent = msg;
}

function ensureStyles() {
  if (document.getElementById('agape-review-styles')) return;
  const style = document.createElement('style');
  style.id = 'agape-review-styles';
  style.textContent = `
    #agape-review-root, #agape-review-root * { box-sizing: border-box; font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif; }
    #agape-review-root { position: fixed; inset: 0; z-index: 2147483000; pointer-events: none; }
    #agape-review-root .rv-chrome { pointer-events: auto; }
    #agape-review-layer {
      position: absolute; left: 0; top: 0; width: 100%;
      pointer-events: none; z-index: 2147482900;
    }
    #agape-review-layer.interactive { pointer-events: auto; cursor: crosshair; }
    #agape-review-layer svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
    .rv-pin {
      position: absolute; transform: translate(-50%, -100%);
      width: 34px; height: 34px; border-radius: 999px;
      border: 2px solid #fff; box-shadow: 0 8px 20px rgba(0,0,0,.25);
      display: grid; place-items: center; color: #fff; font-weight: 700; font-size: 14px;
      cursor: pointer; z-index: 2;
    }
    .rv-pin.selected { outline: 3px solid #111; outline-offset: 2px; }
    .rv-pin-card {
      position: absolute; transform: translate(-50%, calc(-100% - 44px));
      width: min(280px, 70vw); background: #fff; color: #111;
      border-radius: 14px; padding: 12px 12px 10px;
      box-shadow: 0 18px 40px rgba(0,0,0,.22); border: 1px solid rgba(0,0,0,.08);
      z-index: 3; pointer-events: auto;
    }
    .rv-pin-card textarea {
      width: 100%; min-height: 78px; resize: vertical; border: 1px solid #d6d3d1;
      border-radius: 10px; padding: 8px 10px; font: inherit; font-size: 14px; line-height: 1.4;
    }
    .rv-pin-card .rv-meta { display:flex; justify-content:space-between; gap:8px; margin: 6px 0 8px; font-size: 12px; color:#57534e; }
    .rv-pin-card .rv-actions { display:flex; gap:8px; justify-content:flex-end; margin-top: 8px; }
    .rv-pin-card button, .rv-bar button, .rv-panel button, .rv-login button, .rv-gate button {
      appearance: none; border: 0; border-radius: 999px; padding: 8px 12px;
      font: inherit; font-size: 13px; font-weight: 600; cursor: pointer;
      background: #1c1917; color: #fff;
    }
    .rv-pin-card button.secondary, .rv-bar button.secondary, .rv-panel button.secondary {
      background: #e7e5e4; color: #1c1917;
    }
    .rv-pin-card button.danger, .rv-panel button.danger { background: #b91c1c; color:#fff; }
    .rv-bar {
      position: fixed; left: 50%; bottom: 18px; transform: translateX(-50%);
      display: flex; flex-wrap: wrap; gap: 8px; align-items: center; justify-content: center;
      max-width: calc(100vw - 24px); padding: 10px 12px; border-radius: 18px;
      background: rgba(28,25,23,.92); color: #fff; backdrop-filter: blur(10px);
      box-shadow: 0 16px 40px rgba(0,0,0,.28); z-index: 2147483100;
    }
    .rv-bar .rv-tool, .rv-bar .rv-swatch {
      min-width: 40px; height: 40px; border-radius: 12px; padding: 0 10px;
      background: transparent; color: #fff; border: 1px solid rgba(255,255,255,.18);
    }
    .rv-bar .rv-tool.active { background: #fff; color: #1c1917; }
    .rv-bar .rv-swatch { width: 28px; min-width: 28px; height: 28px; border-radius: 999px; padding: 0; border: 2px solid #fff; }
    .rv-bar .rv-swatch.active { outline: 2px solid #fbbf24; outline-offset: 2px; }
    .rv-bar .rv-label { font-size: 12px; opacity: .8; padding: 0 4px; }
    .rv-panel {
      position: fixed; top: 16px; right: 16px; width: min(360px, calc(100vw - 24px));
      max-height: calc(100vh - 110px); overflow: auto; border-radius: 18px;
      background: rgba(255,255,255,.97); color: #1c1917; border: 1px solid rgba(0,0,0,.08);
      box-shadow: 0 18px 50px rgba(0,0,0,.2); padding: 14px; z-index: 2147483100;
    }
    .rv-panel h2 { margin: 0 0 4px; font-size: 16px; }
    .rv-panel .rv-sub { margin: 0 0 12px; font-size: 12px; color: #57534e; line-height: 1.4; }
    .rv-panel .rv-row { display:flex; gap:8px; flex-wrap: wrap; margin-bottom: 10px; }
    .rv-panel .rv-item {
      border: 1px solid #e7e5e4; border-radius: 12px; padding: 10px; margin-bottom: 8px;
      background: #fafaf9; cursor: pointer;
    }
    .rv-panel .rv-item.active { border-color: #1c1917; background: #fff; }
    .rv-panel .rv-item strong { display:block; font-size: 13px; margin-bottom: 4px; }
    .rv-panel .rv-item p { margin: 0; font-size: 13px; color: #44403c; white-space: pre-wrap; }
    .rv-panel .rv-item .rv-tiny { margin-top: 6px; font-size: 11px; color: #78716c; }
    .rv-login-backdrop, .rv-gate {
      position: fixed; inset: 0; z-index: 2147483200; pointer-events: auto;
      display: grid; place-items: center; padding: 20px;
      background: radial-gradient(circle at top, rgba(74,93,58,.35), rgba(28,25,23,.72));
    }
    .rv-login, .rv-gate-card {
      width: min(420px, 100%); background: #fff; color: #1c1917; border-radius: 20px;
      padding: 22px; box-shadow: 0 24px 60px rgba(0,0,0,.28);
    }
    .rv-login h1, .rv-gate-card h1 { margin: 0 0 8px; font-size: 22px; }
    .rv-login p, .rv-gate-card p { margin: 0 0 14px; color: #57534e; font-size: 14px; line-height: 1.5; }
    .rv-login label, .rv-gate-card label { display:block; font-size: 12px; font-weight: 700; margin: 0 0 6px; text-transform: uppercase; letter-spacing: .04em; color:#78716c; }
    .rv-login input, .rv-gate-card input {
      width: 100%; border: 1px solid #d6d3d1; border-radius: 12px; padding: 12px 14px;
      font: inherit; font-size: 15px; margin-bottom: 12px;
    }
    .rv-login .rv-error, .rv-gate-card .rv-error { color: #b91c1c; font-size: 13px; min-height: 1.2em; margin: -4px 0 10px; }
    .rv-status { font-size: 12px; color: #a8a29e; padding: 0 6px; max-width: 180px; }
    body.agape-review-on { scroll-behavior: auto; }
    @media (max-width: 720px) {
      .rv-panel { top: auto; bottom: 86px; right: 12px; left: 12px; width: auto; max-height: 38vh; }
      .rv-bar { bottom: 10px; border-radius: 16px; }
      .rv-status { display:none; }
    }
  `;
  document.head.appendChild(style);
}

function mountChrome() {
  if (root) return;
  ensureStyles();
  document.body.classList.add('agape-review-on');

  root = document.createElement('div');
  root.id = 'agape-review-root';
  root.innerHTML = `
    <div class="rv-panel rv-chrome" id="rv-panel">
      <h2>Site review</h2>
      <p class="rv-sub">Drop notes and draw on the live page. To swap photos or rewrite text, use <a href="/studio" style="color:#fbbf24">Change photos / text</a>.</p>
      <div class="rv-row">
        <label style="flex:1">
          <span style="display:block;font-size:11px;font-weight:700;color:#78716c;margin-bottom:4px">YOUR NAME</span>
          <input id="rv-author" value="${escapeHtml(authorName())}" style="width:100%;border:1px solid #d6d3d1;border-radius:10px;padding:8px 10px;font:inherit" />
        </label>
      </div>
      <div class="rv-row">
        <button type="button" id="rv-send">Send to Kyle</button>
        <button type="button" class="secondary" id="rv-export">Download JSON</button>
        <button type="button" class="secondary" id="rv-import">Import</button>
        <button type="button" class="danger" id="rv-clear">Clear all</button>
        <button type="button" class="secondary" id="rv-logout">Log out</button>
      </div>
      <input type="file" id="rv-file" accept="application/json,.json" hidden />
      <div id="rv-list"></div>
    </div>
    <div class="rv-bar rv-chrome" id="rv-bar">
      <span class="rv-label">Tools</span>
      <button type="button" class="rv-tool active" data-tool="note" title="Text note">Note</button>
      <button type="button" class="rv-tool" data-tool="draw" title="Draw">Draw</button>
      <button type="button" class="rv-tool" data-tool="erase" title="Erase">Erase</button>
      <button type="button" class="rv-tool" data-tool="select" title="Select / move notes">Select</button>
      <span class="rv-label">Color</span>
      ${COLORS.map((c, i) => `<button type="button" class="rv-swatch${i === 0 ? ' active' : ''}" data-color="${c}" style="background:${c}" aria-label="Color ${c}"></button>`).join('')}
      <span class="rv-status" id="rv-status">Ready</span>
    </div>
  `;
  document.body.appendChild(root);

  layer = document.createElement('div');
  layer.id = 'agape-review-layer';
  layer.className = 'interactive';
  svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('aria-hidden', 'true');
  layer.appendChild(svg);
  // Layer sits under chrome but above page content via its own stacking.
  document.body.appendChild(layer);

  listEl = $('#rv-list', root);
  statusEl = $('#rv-status', root);

  root.querySelectorAll<HTMLButtonElement>('.rv-tool').forEach((btn) => {
    btn.addEventListener('click', () => {
      tool = btn.dataset.tool as Tool;
      root!.querySelectorAll('.rv-tool').forEach((b) => b.classList.toggle('active', b === btn));
      updateLayerMode();
      setStatus(
        tool === 'note'
          ? 'Click the page to drop a note'
          : tool === 'draw'
            ? 'Drag to draw'
            : tool === 'erase'
              ? 'Click a note or stroke to erase'
              : 'Click a note to select / drag',
      );
    });
  });

  root.querySelectorAll<HTMLButtonElement>('.rv-swatch').forEach((btn) => {
    btn.addEventListener('click', () => {
      color = btn.dataset.color || COLORS[0];
      root!.querySelectorAll('.rv-swatch').forEach((b) => b.classList.toggle('active', b === btn));
    });
  });

  $('#rv-author', root)?.addEventListener('change', (e) => {
    const value = (e.target as HTMLInputElement).value.trim() || reviewConfig.defaultAuthor;
    localStorage.setItem(reviewConfig.authorKey, value);
    const session = readSession();
    if (session) writeSession(value);
  });

  $('#rv-export', root)?.addEventListener('click', exportJson);
  $('#rv-import', root)?.addEventListener('click', () => $('#rv-file', root!)?.click());
  $('#rv-file', root)?.addEventListener('change', importJson);
  $('#rv-clear', root)?.addEventListener('click', () => {
    if (!annotations.length) return;
    if (!confirm('Clear all review notes and drawings on this device?')) return;
    annotations = [];
    selectedId = null;
    saveAnnotations();
  });
  $('#rv-logout', root)?.addEventListener('click', () => {
    clearSession();
    location.href = '/';
  });
  const exitBtn = document.createElement('button');
  exitBtn.type = 'button';
  exitBtn.className = 'secondary';
  exitBtn.id = 'rv-exit';
  exitBtn.textContent = 'Exit to public site';
  $('#rv-logout', root)?.parentElement?.appendChild(exitBtn);
  exitBtn.addEventListener('click', () => {
    setReviewOpen(false);
    location.href = '/';
  });
  $('#rv-send', root)?.addEventListener('click', sendToKyle);

  layer.addEventListener('pointerdown', onPointerDown);
  layer.addEventListener('pointermove', onPointerMove);
  layer.addEventListener('pointerup', onPointerUp);
  layer.addEventListener('pointercancel', onPointerUp);
  window.addEventListener('resize', renderAll);
  window.addEventListener('scroll', () => {
    // Pins use document coordinates; only size changes need full relayout.
  }, { passive: true });

  // Observe document growth (images/fonts) so the overlay stays full-page.
  const ro = new ResizeObserver(() => renderAll());
  ro.observe(document.documentElement);
  ro.observe(document.body);

  loadAnnotations();
  renderAll();
  updateLayerMode();
  setStatus('Click the page to drop a note');
}

function updateLayerMode() {
  if (!layer) return;
  // Always interactive while review mode is on; cursor reflects tool.
  layer.classList.add('interactive');
  layer.style.cursor =
    tool === 'draw' ? 'crosshair' : tool === 'erase' ? 'cell' : tool === 'select' ? 'default' : 'copy';
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function onPointerDown(e: PointerEvent) {
  if (!layer || !svg) return;
  if ((e.target as HTMLElement).closest('.rv-pin-card')) return;

  const targetPin = (e.target as HTMLElement).closest('.rv-pin') as HTMLElement | null;
  const targetStroke = (e.target as Element).closest('[data-stroke-id]') as SVGElement | null;
  const point = eventToNorm(e);

  if (tool === 'erase') {
    if (targetPin?.dataset.id) {
      annotations = annotations.filter((a) => a.id !== targetPin.dataset.id);
      if (selectedId === targetPin.dataset.id) selectedId = null;
      saveAnnotations();
      return;
    }
    if (targetStroke?.getAttribute('data-stroke-id')) {
      const id = targetStroke.getAttribute('data-stroke-id');
      annotations = annotations.filter((a) => a.id !== id);
      saveAnnotations();
      return;
    }
    return;
  }

  if (tool === 'select' || (tool === 'note' && targetPin)) {
    if (targetPin?.dataset.id) {
      selectedId = targetPin.dataset.id;
      const ann = annotations.find((a) => a.id === selectedId);
      if (ann?.type === 'text') {
        drag = { id: ann.id, dx: point.x - ann.x, dy: point.y - ann.y };
        layer.setPointerCapture(e.pointerId);
      }
      renderAll();
      return;
    }
    selectedId = null;
    renderAll();
    return;
  }

  if (tool === 'note') {
    const now = new Date().toISOString();
    const note: TextAnnotation = {
      id: uid(),
      type: 'text',
      x: point.x,
      y: point.y,
      text: '',
      author: authorName(),
      color,
      createdAt: now,
      updatedAt: now,
    };
    annotations.push(note);
    selectedId = note.id;
    saveAnnotations();
    // Focus the new textarea after paint.
    requestAnimationFrame(() => {
      const ta = document.querySelector(`.rv-pin-card[data-id="${note.id}"] textarea`) as HTMLTextAreaElement | null;
      ta?.focus();
    });
    return;
  }

  if (tool === 'draw') {
    drawing = true;
    currentStroke = {
      id: uid(),
      type: 'stroke',
      points: [point],
      color,
      width: drawWidth,
      author: authorName(),
      createdAt: new Date().toISOString(),
    };
    layer.setPointerCapture(e.pointerId);
    paintStrokePreview();
  }
}

function onPointerMove(e: PointerEvent) {
  const point = eventToNorm(e);
  if (drag) {
    const ann = annotations.find((a) => a.id === drag!.id);
    if (ann?.type === 'text') {
      ann.x = Math.min(1, Math.max(0, point.x - drag.dx));
      ann.y = Math.min(1, Math.max(0, point.y - drag.dy));
      ann.updatedAt = new Date().toISOString();
      renderAll();
    }
    return;
  }
  if (drawing && currentStroke) {
    const last = currentStroke.points[currentStroke.points.length - 1];
    const dx = point.x - last.x;
    const dy = point.y - last.y;
    // Light thinning so JSON stays small.
    if (dx * dx + dy * dy < 0.0000002) return;
    currentStroke.points.push(point);
    paintStrokePreview();
  }
}

function onPointerUp() {
  if (drag) {
    drag = null;
    saveAnnotations();
  }
  if (drawing && currentStroke) {
    if (currentStroke.points.length > 1) {
      annotations.push(currentStroke);
      saveAnnotations();
    } else {
      renderAll();
    }
  }
  drawing = false;
  currentStroke = null;
}

function paintStrokePreview() {
  renderAll();
  if (!svg || !currentStroke) return;
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', strokePath(currentStroke.points));
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke', currentStroke.color);
  path.setAttribute('stroke-width', String(currentStroke.width));
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  path.setAttribute('vector-effect', 'non-scaling-stroke');
  svg.appendChild(path);
}

function strokePath(points: Array<{ x: number; y: number }>) {
  const { width, height } = docSize();
  return points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x * width} ${p.y * height}`)
    .join(' ');
}

function renderAll() {
  if (!layer || !svg || !listEl) return;
  const { width, height } = docSize();
  layer.style.height = `${height}px`;
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('width', String(width));
  svg.setAttribute('height', String(height));
  svg.innerHTML = '';

  // Remove previous pins/cards inside layer (keep svg).
  layer.querySelectorAll('.rv-pin, .rv-pin-card').forEach((n) => n.remove());

  for (const ann of annotations) {
    if (ann.type === 'stroke') {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', strokePath(ann.points));
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', ann.color);
      path.setAttribute('stroke-width', String(ann.width));
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('stroke-linejoin', 'round');
      path.setAttribute('vector-effect', 'non-scaling-stroke');
      path.setAttribute('data-stroke-id', ann.id);
      path.style.pointerEvents = tool === 'erase' ? 'stroke' : 'none';
      path.style.cursor = tool === 'erase' ? 'cell' : 'default';
      svg.appendChild(path);
    }
  }

  let noteIndex = 0;
  for (const ann of annotations) {
    if (ann.type !== 'text') continue;
    noteIndex += 1;
    const pin = document.createElement('button');
    pin.type = 'button';
    pin.className = `rv-pin${selectedId === ann.id ? ' selected' : ''}`;
    pin.dataset.id = ann.id;
    pin.style.left = `${ann.x * 100}%`;
    pin.style.top = `${ann.y * height}px`;
    pin.style.background = ann.color;
    pin.textContent = String(noteIndex);
    pin.title = ann.text || 'Empty note';
    layer.appendChild(pin);

    if (selectedId === ann.id) {
      const card = document.createElement('div');
      card.className = 'rv-pin-card';
      card.dataset.id = ann.id;
      card.style.left = `${ann.x * 100}%`;
      card.style.top = `${ann.y * height}px`;
      card.innerHTML = `
        <div class="rv-meta"><span>${escapeHtml(ann.author)}</span><span>#${noteIndex}</span></div>
        <textarea placeholder="What should change here?">${escapeHtml(ann.text)}</textarea>
        <div class="rv-actions">
          <button type="button" class="danger" data-action="delete">Delete</button>
          <button type="button" data-action="save">Save</button>
        </div>
      `;
      const ta = card.querySelector('textarea') as HTMLTextAreaElement;
      ta.addEventListener('pointerdown', (ev) => ev.stopPropagation());
      ta.addEventListener('change', () => {
        ann.text = ta.value.trim();
        ann.updatedAt = new Date().toISOString();
        saveAnnotations();
      });
      card.querySelector('[data-action="save"]')?.addEventListener('click', (ev) => {
        ev.stopPropagation();
        ann.text = ta.value.trim();
        ann.updatedAt = new Date().toISOString();
        selectedId = null;
        saveAnnotations();
      });
      card.querySelector('[data-action="delete"]')?.addEventListener('click', (ev) => {
        ev.stopPropagation();
        annotations = annotations.filter((a) => a.id !== ann.id);
        selectedId = null;
        saveAnnotations();
      });
      layer.appendChild(card);
    }
  }

  // Side list
  const texts = annotations.filter((a): a is TextAnnotation => a.type === 'text');
  const strokes = annotations.filter((a) => a.type === 'stroke').length;
  listEl.innerHTML = `
    <p class="rv-sub" style="margin-top:4px">${texts.length} text note${texts.length === 1 ? '' : 's'} · ${strokes} drawing${strokes === 1 ? '' : 's'}</p>
    ${texts
      .map((ann, i) => {
        const snippet = ann.text.trim() || '(empty note — click to edit)';
        return `<div class="rv-item${selectedId === ann.id ? ' active' : ''}" data-id="${ann.id}">
          <strong style="color:${ann.color}">Note ${i + 1}</strong>
          <p>${escapeHtml(snippet)}</p>
          <div class="rv-tiny">${escapeHtml(ann.author)} · ${new Date(ann.updatedAt || ann.createdAt).toLocaleString()}</div>
        </div>`;
      })
      .join('') || '<p class="rv-sub">No notes yet. Choose <b>Note</b> and click the page.</p>'}
  `;
  listEl.querySelectorAll<HTMLElement>('.rv-item').forEach((item) => {
    item.addEventListener('click', () => {
      const id = item.dataset.id;
      const ann = annotations.find((a) => a.id === id);
      if (!ann || ann.type !== 'text') return;
      selectedId = ann.id;
      const { height: h } = docSize();
      window.scrollTo({ top: Math.max(0, ann.y * h - window.innerHeight * 0.35), behavior: 'smooth' });
      renderAll();
    });
  });
}

function packagePayload() {
  return {
    site: location.origin,
    page: location.pathname + location.search,
    exportedAt: new Date().toISOString(),
    author: authorName(),
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      scrollY: window.scrollY,
      documentHeight: docSize().height,
      documentWidth: docSize().width,
    },
    annotations,
    textSummary: annotations
      .filter((a): a is TextAnnotation => a.type === 'text')
      .map((a, i) => `${i + 1}. [${a.author}] ${a.text || '(empty)'} @ ${(a.y * 100).toFixed(1)}% down page`)
      .join('\n'),
  };
}

function exportJson() {
  const payload = packagePayload();
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  const stamp = new Date().toISOString().slice(0, 10);
  a.href = URL.createObjectURL(blob);
  a.download = `agape-review-${stamp}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
  setStatus('Downloaded review JSON');
}

async function importJson(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    const next = Array.isArray(data) ? data : data.annotations;
    if (!Array.isArray(next)) throw new Error('No annotations array');
    annotations = next as Annotation[];
    selectedId = null;
    saveAnnotations();
    setStatus(`Imported ${annotations.length} items`);
  } catch {
    alert('Could not import that file. Use a review JSON export from this tool.');
  } finally {
    input.value = '';
  }
}

async function sendToKyle() {
  const payload = packagePayload();
  const texts = annotations.filter((a) => a.type === 'text');
  if (!texts.length && !annotations.some((a) => a.type === 'stroke')) {
    alert('Add at least one note or drawing before sending.');
    return;
  }
  setStatus('Sending…');
  try {
    // FormSubmit delivers to Kyle's inbox. First-ever send requires Kyle to
    // click the FormSubmit activation email for this address.
    const res = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(reviewConfig.notifyEmail)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `Agape website review from ${payload.author}`,
          _template: 'table',
          _captcha: 'false',
          name: payload.author,
          email: reviewConfig.notifyEmail,
          message: `Website review notes\n\nPage: ${payload.page}\nWhen: ${payload.exportedAt}\n\n${payload.textSummary || '(drawings only)'}\n\nFull JSON is in annotations_json — save it and use Import on /review if you want the pins back on the page.`,
          page_url: location.href,
          annotation_count: String(annotations.length),
          annotations_json: JSON.stringify(payload),
        }),
      },
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    setStatus('Sent to Kyle');
    alert('Sent to Kyle. You can keep editing — this device still has your local copy.');
  } catch (err) {
    console.error(err);
    setStatus('Send failed — download JSON instead');
    alert('Could not email right now. Use Download JSON and text/email that file instead.');
    exportJson();
  }
}

function showLogin(opts?: { gatePage?: boolean }) {
  ensureStyles();
  const wrap = document.createElement('div');
  wrap.className = opts?.gatePage ? 'rv-gate' : 'rv-login-backdrop';
  wrap.innerHTML = `
    <div class="${opts?.gatePage ? 'rv-gate-card' : 'rv-login'}">
      <h1>Agape site review</h1>
      <p>Private markup tools for Adolfo and Kyle. Log in to leave text notes and drawings on the live website.</p>
      <label for="rv-pass">Password</label>
      <input id="rv-pass" type="password" autocomplete="current-password" placeholder="Review password" />
      <label for="rv-name">Your name</label>
      <input id="rv-name" type="text" value="${escapeHtml(localStorage.getItem(reviewConfig.authorKey) || reviewConfig.defaultAuthor)}" />
      <div class="rv-error" id="rv-error"></div>
      <button type="button" id="rv-login-btn">Open review tools</button>
      ${opts?.gatePage ? '<p style="margin:14px 0 0;font-size:13px"><a href="/" style="color:#4A5D3A">Back to public site</a></p>' : ''}
    </div>
  `;
  document.body.appendChild(wrap);
  const pass = $('#rv-pass', wrap) as HTMLInputElement;
  const name = $('#rv-name', wrap) as HTMLInputElement;
  const err = $('#rv-error', wrap);
  const submit = async () => {
    const hash = await sha256Hex(pass.value.trim());
    if (hash !== reviewConfig.passwordHash) {
      if (err) err.textContent = 'Wrong password.';
      pass.focus();
      return;
    }
    writeSession(name.value.trim() || reviewConfig.defaultAuthor);
    if (opts?.gatePage || location.pathname.replace(/\/+$/, '') === '/review') {
      location.href = '/?review=1';
      return;
    }
    wrap.remove();
    mountChrome();
  };
  $('#rv-login-btn', wrap)?.addEventListener('click', () => void submit());
  pass.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') void submit();
  });
  name.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') void submit();
  });
  pass.focus();
}

export function initReviewMode() {
  const path = location.pathname.replace(/\/+$/, '') || '/';
  const params = new URLSearchParams(location.search);
  const wantsReview = params.get('review') === '1' || path === '/review';
  const session = readSession();

  // Drop the old sticky localStorage open flag so clean URLs stay public.
  try {
    localStorage.removeItem(OPEN_KEY);
  } catch {
    // ignore
  }

  if (path === '/review' && !session) {
    showLogin({ gatePage: true });
    return;
  }

  if (path === '/review' && session) {
    setReviewOpen(true);
    location.replace('/?review=1');
    return;
  }

  // Markup tools only when explicitly reviewing (?review=1), never on the plain site.
  if (wantsReview && session) {
    setReviewOpen(true);
    mountChrome();
    return;
  }

  if (wantsReview && !session) {
    showLogin();
    return;
  }

  // Public homepage / normal pages: no review UI.
  setReviewOpen(false);
}

// Auto-boot when imported from the site layout.
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initReviewMode(), { once: true });
  } else {
    initReviewMode();
  }
}
