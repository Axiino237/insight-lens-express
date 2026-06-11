import spriteWebp from "@/assets/Bird/sprite.webp";

interface BirdAnimationProps {
  className?: string;
  speedMs?: number;
}

export function BirdAnimation({ className = "h-10 w-10", speedMs = 45 }: BirdAnimationProps) {
  const durationSec = (speedMs * 7) / 1000;

  return (
    <div className={`${className} flex items-center justify-center overflow-hidden`}>
      <div className="relative w-full h-full max-w-full max-h-full aspect-[256/144] overflow-hidden">
        {/* GPU-accelerated bird sprite sheet */}
        <img
          src={spriteWebp}
          alt="Flying bird animation"
          className="absolute top-0 left-0 h-full max-w-none pointer-events-none select-none"
          style={{
            width: "700%",
            transform: "translate3d(0%, 0, 0)",
            willChange: "transform",
            animation: `playBirdTransform ${durationSec}s steps(7) infinite`,
          }}
        />
      </div>
    </div>
  );
}

