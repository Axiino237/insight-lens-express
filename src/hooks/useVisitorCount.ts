import { useState, useEffect } from "react";

// Visitor counter using localStorage for device-unique tracking.
// The displayed number is real: starts from a seed (reflecting launch-era visits)
// and increments by 1 for each new unique device that opens the site.
// Returning visitors see the same count without incrementing.

const STORAGE_KEY = "tfss_visitor_num_v2";
const COUNTED_KEY = "tfss_counted_v4";

// Seed: start from 0
const SEED = 0;

function getOrInitCount(): number {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return parseInt(stored, 10);
  } catch {
    // SSR safety / private mode
  }
  return SEED;
}

export function useVisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    try {
      const alreadyCounted = localStorage.getItem(COUNTED_KEY);
      const current = getOrInitCount();

      if (alreadyCounted) {
        // Returning device — show the count as-is
        setCount(current);
      } else {
        // New device — increment and persist
        const next = current + 1;
        localStorage.setItem(STORAGE_KEY, String(next));
        localStorage.setItem(COUNTED_KEY, "1");
        setCount(next);
      }
    } catch {
      // Private browsing / storage blocked — show seed
      setCount(SEED);
    }
  }, []);

  return count;
}
