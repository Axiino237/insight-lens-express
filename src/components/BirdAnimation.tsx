import spriteWebp from "@/assets/Bird/sprite.webp";

interface BirdAnimationProps {
  className?: string;
  speedMs?: number;
}

export function BirdAnimation({ className = "h-10 w-10", speedMs = 45 }: BirdAnimationProps) {
  const durationSec = (speedMs * 7) / 1000;

  return (
    <img
      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 144'%3E%3C/svg%3E"
      alt="Flying bird animation"
      className={`${className}`}
      style={{
        backgroundImage: `url(${spriteWebp})`,
        backgroundSize: "700% 100%",
        backgroundRepeat: "no-repeat",
        animation: `playBird ${durationSec}s linear infinite`,
      }}
      loading="eager"
    />
  );
}

