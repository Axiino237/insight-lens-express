import spriteWebp from "@/assets/Bird/sprite.webp";

interface BirdAnimationProps {
  className?: string;
  speedMs?: number;
}

export function BirdAnimation({ className = "h-10 w-10", speedMs = 45 }: BirdAnimationProps) {
  const durationSec = (speedMs * 7) / 1000;

  return (
    <div className={`${className} flex items-center justify-center overflow-hidden`}>
      <div className="relative max-w-full max-h-full aspect-[256/144] overflow-hidden flex items-center justify-center">
        {/* Invisible sizer SVG that scales naturally to fit the container bounds */}
        <img
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 144'%3E%3C/svg%3E"
          alt=""
          className="block max-w-full max-h-full h-auto w-auto pointer-events-none select-none opacity-0"
        />
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

