/**
 * v0.2 motion bootstrap — Lenis smooth scroll + Intersection Observer reveals
 * + hero word-stagger orchestration + custom cursor.
 *
 * Reduced-motion is handled globally in tokens.css. We still skip Lenis if the
 * user requests reduced motion (smooth scroll is itself motion).
 */

import Lenis from 'lenis';

const prefersReducedMotion =
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

// ─── Lenis smooth scroll ─────────────────────────────────────────────────
function bootLenis() {
  if (prefersReducedMotion) return null;
  // iOS Safari has its own momentum scroll. Lenis on touch fights it and feels worse.
  // Only enable on devices that have a real mouse / trackpad.
  const hasFineHover = window.matchMedia?.('(hover: hover) and (pointer: fine)').matches;
  if (!hasFineHover) return null;

  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    wheelMultiplier: 1,
    smoothWheel: true,
  });
  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  return lenis;
}

// ─── Hero load orchestration ─────────────────────────────────────────────
function playHeroLoad() {
  const status = document.querySelector<HTMLElement>('[data-anim="hero-status"]');
  const lead = document.querySelector<HTMLElement>('[data-anim="hero-lead"]');
  const ctas = document.querySelector<HTMLElement>('[data-anim="hero-ctas"]');
  const trust = document.querySelector<HTMLElement>('[data-anim="hero-trust"]');

  // Word stagger — only words for the active language render due to display rules
  const words = document.querySelectorAll<HTMLElement>('.hero-h1 .hero-word');
  words.forEach((word, i) => {
    word.style.transition =
      'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1)';
    word.style.transitionDelay = `${250 + i * 60}ms`;
    requestAnimationFrame(() => {
      word.style.opacity = '1';
      word.style.transform = 'translateY(0)';
    });
  });

  if (status) {
    status.style.transition =
      'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1)';
    requestAnimationFrame(() => {
      status.style.opacity = '1';
      status.style.transform = 'translateY(0)';
    });
  }

  const wordCount = words.length;
  const followUps: Array<[HTMLElement | null, number]> = [
    [lead, 250 + wordCount * 60 + 150],
    [ctas, 250 + wordCount * 60 + 250],
    [trust, 250 + wordCount * 60 + 350],
  ];
  followUps.forEach(([el, delay]) => {
    if (!el) return;
    el.style.transition =
      'opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1)';
    el.style.transitionDelay = `${delay}ms`;
    requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  });
}

// ─── Scroll reveals ──────────────────────────────────────────────────────
function setupScrollReveals() {
  if (!('IntersectionObserver' in window)) {
    document
      .querySelectorAll('.reveal, .reveal-stagger')
      .forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -8% 0px' }
  );

  document
    .querySelectorAll<HTMLElement>('.reveal, .reveal-stagger')
    .forEach((el) => observer.observe(el));
}

// ─── Process SVG line draw ───────────────────────────────────────────────
function setupProcessLine() {
  const lines = document.querySelectorAll<SVGPathElement>('[data-process-line]');
  if (!lines.length || !('IntersectionObserver' in window)) return;

  lines.forEach((line) => {
    const length = line.getTotalLength();
    line.style.strokeDasharray = `${length}`;
    line.style.strokeDashoffset = `${length}`;
    line.style.transition = 'stroke-dashoffset 1.6s cubic-bezier(0.22, 1, 0.36, 1)';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          (entry.target as SVGElement)
            .querySelectorAll<SVGPathElement>('[data-process-line]')
            .forEach((line) => (line.style.strokeDashoffset = '0'));
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.25 }
  );
  document
    .querySelectorAll<SVGElement>('[data-process-line-container]')
    .forEach((el) => observer.observe(el));
}

// ─── Custom cursor ───────────────────────────────────────────────────────
function setupCustomCursor() {
  // Touch devices: skip
  if (window.matchMedia?.('(hover: none)').matches) return;
  if (prefersReducedMotion) return;

  const cursor = document.createElement('div');
  cursor.className = 'cursor-ring';
  cursor.setAttribute('aria-hidden', 'true');
  document.body.appendChild(cursor);

  let x = 0;
  let y = 0;
  let tx = 0;
  let ty = 0;

  const update = () => {
    tx += (x - tx) * 0.18;
    ty += (y - ty) * 0.18;
    cursor.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    requestAnimationFrame(update);
  };
  requestAnimationFrame(update);

  document.addEventListener('mousemove', (e) => {
    x = e.clientX;
    y = e.clientY;
  });

  // Grow on interactive elements
  const interactive = 'a, button, [role="button"], [data-magnetic], input, textarea, select';
  document.addEventListener('mouseover', (e) => {
    if ((e.target as HTMLElement).closest(interactive)) {
      cursor.classList.add('is-hovering');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if ((e.target as HTMLElement).closest(interactive)) {
      cursor.classList.remove('is-hovering');
    }
  });

  // Hide on leave window
  document.addEventListener('mouseleave', () => cursor.classList.add('is-hidden'));
  document.addEventListener('mouseenter', () => cursor.classList.remove('is-hidden'));
}

// ─── Marquee setup ───────────────────────────────────────────────────────
function setupMarquees() {
  document.querySelectorAll<HTMLElement>('[data-marquee]').forEach((el) => {
    el.addEventListener('mouseenter', () => el.classList.add('is-paused'));
    el.addEventListener('mouseleave', () => el.classList.remove('is-paused'));
  });
}

// ─── 3D card tilt (componentry-style hover effect) ──────────────────────
function setup3DTilt() {
  if (window.matchMedia?.('(hover: none)').matches) return;
  if (prefersReducedMotion) return;

  const tiltCards = document.querySelectorAll<HTMLElement>('[data-tilt]');
  tiltCards.forEach((card) => {
    let rect: DOMRect;
    const intensity = parseFloat(card.dataset.tiltIntensity || '8'); // degrees
    const reset = () => {
      card.style.transform = '';
      const sheen = card.querySelector<HTMLElement>('[data-tilt-sheen]');
      if (sheen) sheen.style.opacity = '0';
    };
    card.addEventListener('mouseenter', () => {
      rect = card.getBoundingClientRect();
    });
    card.addEventListener('mousemove', (e) => {
      if (!rect) rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width; // 0..1
      const py = (e.clientY - rect.top) / rect.height;
      const rotY = (px - 0.5) * 2 * intensity;
      const rotX = (0.5 - py) * 2 * intensity;
      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`;
      const sheen = card.querySelector<HTMLElement>('[data-tilt-sheen]');
      if (sheen) {
        sheen.style.opacity = '1';
        sheen.style.background = `radial-gradient(circle 40% at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.18), transparent 60%)`;
      }
    });
    card.addEventListener('mouseleave', reset);
  });
}

// ─── Animated counter (number ticks up on scroll into view) ─────────────
function setupCounters() {
  const counters = document.querySelectorAll<HTMLElement>('[data-counter]');
  if (!counters.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        const target = parseInt(el.dataset.counter || '0', 10);
        const duration = parseInt(el.dataset.counterDuration || '1400', 10);
        const start = performance.now();
        const fmt = (n: number) => Math.round(n).toString();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          // easeOutCubic
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = fmt(target * eased);
          if (t < 1) requestAnimationFrame(tick);
          else el.textContent = fmt(target);
        };
        requestAnimationFrame(tick);
        observer.unobserve(el);
      }
    },
    { threshold: 0.5 }
  );
  counters.forEach((el) => observer.observe(el));
}

// ─── Scroll-driven mask reveal for big H2s ──────────────────────────────
function setupMaskReveals() {
  const maskEls = document.querySelectorAll<HTMLElement>('[data-mask-reveal]');
  if (!maskEls.length || !('IntersectionObserver' in window)) return;

  // Set initial mask state
  maskEls.forEach((el) => {
    el.style.backgroundImage = 'linear-gradient(90deg, currentColor 0%, currentColor 100%)';
    el.style.backgroundSize = '0% 100%';
    el.style.backgroundRepeat = 'no-repeat';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.style.transition = 'background-size 1.4s cubic-bezier(0.22, 1, 0.36, 1)';
          el.style.backgroundSize = '100% 100%';
          observer.unobserve(el);
        }
      }
    },
    { threshold: 0.3 }
  );
  maskEls.forEach((el) => observer.observe(el));
}

// ─── Boot ────────────────────────────────────────────────────────────────
function init() {
  bootLenis();
  playHeroLoad();
  setupScrollReveals();
  setupProcessLine();
  setupCustomCursor();
  setupMarquees();
  setup3DTilt();
  setupCounters();
  setupMaskReveals();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
