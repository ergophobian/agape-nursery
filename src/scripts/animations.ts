/**
 * Motion moments per PLAN.md §5.1:
 *   1. Hero load — title fade-up + word stagger
 *   4. Service tiles — scroll-in stagger (CSS handles hover lift)
 *   5. Portfolio — fade-in
 *   6. Process — SVG line draws on scroll
 *
 * Implementation uses Intersection Observer (vanilla, ~1.5KB).
 * GSAP is reserved for Phase-2 polish if a moment actually needs it.
 *
 * Reduced-motion is handled globally in tokens.css — this script doesn't need
 * to gate per-element. Animations still fire but compress to <1ms.
 */

type AnimKey =
  | 'hero-status'
  | 'hero-h1-line'
  | 'hero-word'
  | 'hero-h1-es'
  | 'hero-lead'
  | 'hero-ctas'
  | 'hero-trust'
  | 'reveal'
  | 'reveal-stagger'
  | 'process-line';

/** Hero load: orchestrated reveal as soon as DOM is ready. */
function playHeroLoad() {
  const status = document.querySelector<HTMLElement>('[data-anim="hero-status"]');
  const words = document.querySelectorAll<HTMLElement>('[data-anim="hero-word"]');
  const heroEs = document.querySelector<HTMLElement>('[data-anim="hero-h1-es"]');
  const lead = document.querySelector<HTMLElement>('[data-anim="hero-lead"]');
  const ctas = document.querySelector<HTMLElement>('[data-anim="hero-ctas"]');
  const trust = document.querySelector<HTMLElement>('[data-anim="hero-trust"]');

  // Reveal status pill first (200ms), then words stagger (50ms each)
  if (status) {
    status.style.transition =
      'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1)';
    requestAnimationFrame(() => {
      status.style.opacity = '1';
      status.style.transform = 'translateY(0)';
    });
  }

  // Words: per-word opacity + translateY with staggered delay
  words.forEach((word, i) => {
    word.style.transition =
      'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1)';
    word.style.transitionDelay = `${300 + i * 50}ms`;
    requestAnimationFrame(() => {
      word.style.opacity = '1';
      word.style.transform = 'translateY(0)';
    });
  });

  // Spanish line, lead, CTAs, trust line — staggered after words
  const followUps: Array<[HTMLElement | null, number]> = [
    [heroEs, 700],
    [lead, 800],
    [ctas, 900],
    [trust, 1000],
  ];
  followUps.forEach(([el, delay]) => {
    if (!el) return;
    el.style.transition =
      'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1)';
    el.style.transitionDelay = `${delay}ms`;
    requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  });
}

/** Scroll-triggered reveals: motion moments 4, 5, plus generic .reveal */
function setupScrollReveals() {
  if (!('IntersectionObserver' in window)) {
    // Old-browser fallback: just show everything immediately.
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
    {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px', // trigger slightly before fully in view
    }
  );

  document
    .querySelectorAll<HTMLElement>('.reveal, .reveal-stagger')
    .forEach((el) => observer.observe(el));
}

/** Motion moment #6: Process SVG line draws on scroll. */
function setupProcessLine() {
  const line = document.querySelector<SVGPathElement>('.process-line-path');
  if (!line || !('IntersectionObserver' in window)) return;

  const length = line.getTotalLength();
  line.style.strokeDasharray = `${length}`;
  line.style.strokeDashoffset = `${length}`;
  line.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1)';

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          line.style.strokeDashoffset = '0';
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.3 }
  );
  observer.observe(line);
}

/** Boot. */
function init() {
  playHeroLoad();
  setupScrollReveals();
  setupProcessLine();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
