import { useState, useEffect } from "react";

const NAMESPACE = "thefirststepsolutions.com";
const KEY = "visitor-count";
const COUNTED_KEY = "tfss_visited";

export function useVisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const alreadyCounted = localStorage.getItem(COUNTED_KEY);

    if (alreadyCounted) {
      // Device already counted — just fetch the current total without incrementing
      fetch(`https://api.countapi.xyz/get/${NAMESPACE}/${KEY}`)
        .then((r) => r.json())
        .then((d) => {
          if (typeof d.value === "number") setCount(d.value);
        })
        .catch(() => {
          // Silently ignore network errors
        });
    } else {
      // First visit on this device — hit the count endpoint
      fetch(`https://api.countapi.xyz/hit/${NAMESPACE}/${KEY}`)
        .then((r) => r.json())
        .then((d) => {
          if (typeof d.value === "number") {
            setCount(d.value);
            localStorage.setItem(COUNTED_KEY, "1");
          }
        })
        .catch(() => {
          // Silently ignore network errors
        });
    }
  }, []);

  return count;
}
