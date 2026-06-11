import spriteWebp from "@/assets/Bird/sprite.webp";

interface BirdAnimationProps {
  className?: string;
  speedMs?: number;
}

export function BirdAnimation({ className = "h-10 w-10", speedMs = 45 }: BirdAnimationProps) {
  const durationSec = (speedMs * 7) / 1000;

  return (
    <div
      className={`${className} relative overflow-hidden`}
      style={{
        aspectRatio: "256 / 144",
        transform: "translate3d(0, 0, 0)",
        WebkitTransform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      {/* GPU-accelerated bird sprite sheet */}
      <img
        src={spriteWebp}
        alt="Flying bird animation"
        className="absolute top-0 left-0 h-full max-w-none pointer-events-none select-none"
        style={{
          width: "700%",
          transform: "translate3d(0%, 0, 0)",
          WebkitTransform: "translate3d(0%, 0, 0)",
          willChange: "transform",
          animation: `playBirdTransform ${durationSec}s steps(7) infinite`,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      />
    </div>
  );
}

