import { useEffect, useRef, useState } from 'react';

export function AnimatedNumber({ value, enabled }: { value: number; enabled: boolean }) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const completed = useRef(false);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!enabled || completed.current) {
      setDisplay(value);
      return;
    }
    const element = elementRef.current;
    if (!element) return;
    let frame = 0;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      completed.current = true;
      const start = performance.now();
      function tick(now: number) {
        const progress = Math.min(1, (now - start) / 1000);
        setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = requestAnimationFrame(tick);
      }
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, enabled]);

  return <span ref={elementRef} className="plan-number" aria-label={String(value)}><span aria-hidden="true">{display}</span></span>;
}
