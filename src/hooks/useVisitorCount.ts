import { useState, useEffect } from "react";

// Visitor counter using counterapi.dev for cross-device unique tracking.
// The displayed number increments by 1 for each new unique device that opens the site.
// Returning visitors see the same count without incrementing.

const NAMESPACE = "thefirststepsolutions.com";
const KEY = "visitors";
const COUNTED_KEY = "tfss_counted_v5"; // new key version to register current devices on the new server
const SEED = 0; // Customize if you want a base starting number (e.g., 480)

export function useVisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let alreadyCounted = false;
    try {
      alreadyCounted = !!localStorage.getItem(COUNTED_KEY);
    } catch {
      // Storage blocked or Private browsing
    }

    const endpoint = alreadyCounted
      ? `https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}`
      : `https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}/up`;

    fetch(endpoint)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        if (typeof data.count === "number") {
          setCount(data.count + SEED);
          if (!alreadyCounted) {
            try {
              localStorage.setItem(COUNTED_KEY, "1");
            } catch {
              // Ignore storage errors in private browsing
            }
          }
        }
      })
      .catch((err) => {
        console.error("Error fetching visitor count:", err);
      });
  }, []);

  return count;
}
