import { useEffect, useRef, useState } from "react";

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export function Counter({ value, suffix = "", duration = 1600 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Smooth easeOutExpo for premium feeling deceleration
            const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCount(Math.floor(easeOut * value));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(value);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [value, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}
