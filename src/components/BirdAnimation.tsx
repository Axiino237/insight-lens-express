import { useState, useEffect } from "react";
import frame1 from "@/assets/Bird/0001.png";
import frame2 from "@/assets/Bird/0002.png";
import frame3 from "@/assets/Bird/0003.png";
import frame4 from "@/assets/Bird/0004.png";
import frame5 from "@/assets/Bird/0005.png";
import frame6 from "@/assets/Bird/0006.png";
import frame7 from "@/assets/Bird/0007.png";

const frames = [frame1, frame2, frame3, frame4, frame5, frame6, frame7];

// Preload frames in the browser background to avoid visual flicker during animation
if (typeof window !== "undefined") {
  frames.forEach((frame) => {
    const img = new Image();
    img.src = frame;
  });
}

interface BirdAnimationProps {
  className?: string;
  speedMs?: number;
}

export function BirdAnimation({ className = "h-10 w-10", speedMs = 120 }: BirdAnimationProps) {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frames.length);
    }, speedMs);

    return () => clearInterval(interval);
  }, [speedMs]);

  return (
    <img
      src={frames[currentFrame]}
      alt="Flying bird animation"
      className={`${className} object-contain`}
      loading="eager"
    />
  );
}
