/* ==========================================================================
   KGV — Home hero: pinned hero with blurred scroll-mask reveal
   (mirrors the Vita Travel reference behavior, restyled gold/black)
   Requires GSAP + ScrollTrigger (loaded via CDN in index.html)
   ========================================================================== */

(function () {
  'use strict';

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const wrap = document.querySelector('.hero-pin-wrap');
  const mask = document.querySelector('.hero-mask');
  const title = document.querySelector('.hero__title');
  const subtitle = document.querySelector('.hero__subtitle');
  const actions = document.querySelector('.hero__actions');
  const media = document.querySelector('.hero__media img, .hero__media video');

  if (!wrap || !mask) return;

  // Respect reduced-motion preference
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  // Entrance: title/subtitle/actions fade+rise on load
  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .fromTo(title, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
    .fromTo(subtitle, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
    .fromTo(actions, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6');

  // Subtle parallax on the hero background as user scrolls within the pin
  if (media) {
    gsap.to(media, {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: wrap,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  // The mask: slides down from above the viewport to fully cover the hero,
  // with the blurred edge (see CSS ::after) doing the "swallow" reveal.
  gsap.fromTo(
    mask,
    { yPercent: -100 },
    {
      yPercent: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: wrap,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    }
  );
})();
