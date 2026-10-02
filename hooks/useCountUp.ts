'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * useCountUp — anima un número desde `from` hasta `to` con easing cúbico out.
 * @param to       Valor final al que animar
 * @param duration Duración en ms (por defecto 1200ms)
 * @param from     Valor inicial (por defecto 0)
 */
export function useCountUp(
  to: number,
  duration: number = 1200,
  from: number = 0
): number {
  const [current, setCurrent] = useState(from);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const prevToRef = useRef<number>(from);

  useEffect(() => {
    if (to === prevToRef.current) return;
    prevToRef.current = to;

    const startValue = current;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) startTimeRef.current = timestamp;

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Easing cúbico out: rápido al inicio, suave al llegar
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(startValue + (to - startValue) * eased);

      setCurrent(value);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCurrent(to);
        startTimeRef.current = null;
      }
    };

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      startTimeRef.current = null;
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [to, duration]);

  return current;
}
