import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

export function useMotionPreference() {
  const [enabled, setEnabled] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setEnabled(!preference.matches);
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  return [enabled, setEnabled] as const;
}

export function usePageMotion(rootRef: RefObject<HTMLDivElement | null>, enabled: boolean) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const header = root.querySelector<HTMLElement>('.site-header');
    const progress = root.querySelector<HTMLElement>('.reading-progress');
    const hero = root.querySelector<HTMLElement>('.hero-stage');
    const sections = Array.from(root.querySelectorAll<HTMLElement>('main section[id]'));
    const navigation = Array.from(root.querySelectorAll<HTMLAnchorElement>('.site-nav > a'));
    const finePointer = window.matchMedia('(pointer: fine)');
    let frame = 0;
    let compact = false;

    function update() {
      frame = 0;
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      const fraction = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
      if (progress) progress.style.transform = `scaleX(${fraction})`;

      if (window.scrollY > 140) compact = true;
      if (window.scrollY < 60) compact = false;
      header?.classList.toggle('is-scrolled', compact);

      const offset = (header?.getBoundingClientRect().height ?? 0) + 100;
      let active = '';
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= offset) active = section.id;
      }
      for (const link of navigation) {
        if (link.hash === `#${active}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      }

      const shift = enabled && finePointer.matches ? Math.min(20, window.scrollY * 0.08) : 0;
      hero?.style.setProperty('--hero-shift', `${shift}px`);
    }

    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(root);
    update();

    const revealItems = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.revealState = 'visible';
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

    for (const item of revealItems) {
      if (!enabled || item.getBoundingClientRect().top < window.innerHeight - 24) {
        item.dataset.revealState = 'visible';
      } else {
        item.dataset.revealState = 'waiting';
        observer.observe(item);
      }
    }

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      observer.disconnect();
      for (const item of revealItems) item.dataset.revealState = 'visible';
    };
  }, [rootRef, enabled]);
}
