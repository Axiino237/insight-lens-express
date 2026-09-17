import React, { useRef, useEffect, useState, useCallback } from "react";
import { brandLogos, BrandLogo } from "@/data/brandLogos";

export const BrandMarquee: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const xPos = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  const startX = useRef<number>(0);
  const lastX = useRef<number>(0);
  const velocity = useRef<number>(0);
  const singleSetWidth = useRef<number>(0);
  const hasMoved = useRef<boolean>(false);

  const [isGrabbed, setIsGrabbed] = useState<boolean>(false);

  // Triple set for completely seamless, gap-free infinite scrolling & dragging
  const logos = [...brandLogos, ...brandLogos, ...brandLogos];

  // Recalculate set width accurately
  const recalculateWidth = useCallback(() => {
    if (trackRef.current) {
      const totalWidth = trackRef.current.scrollWidth;
      if (totalWidth > 0) {
        singleSetWidth.current = totalWidth / 3;
      }
    }
  }, []);

  useEffect(() => {
    recalculateWidth();

    // Use ResizeObserver to automatically update width if window resizes or images load
    let resizeObserver: ResizeObserver | null = null;
    if (trackRef.current && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        recalculateWidth();
      });
      resizeObserver.observe(trackRef.current);
    }

    let animationFrameId: number;
    const baseSpeed = 0.85; // Natural marquee scrolling speed (pixels per frame)

    const loop = () => {
      const setWidth = singleSetWidth.current;
      if (setWidth > 0 && trackRef.current) {
        if (!isDragging.current) {
          // If user gave it a flick, apply inertia decay
          if (Math.abs(velocity.current) > 0.1) {
            xPos.current += velocity.current;
            velocity.current *= 0.94; // smooth friction decay
          } else {
            // Constant auto-scroll to the left
            velocity.current = 0;
            xPos.current -= baseSpeed;
          }

          // Wrap seamlessly
          while (xPos.current <= -setWidth) {
            xPos.current += setWidth;
          }
          while (xPos.current > 0) {
            xPos.current -= setWidth;
          }

          trackRef.current.style.transform = `translate3d(${xPos.current}px, 0, 0)`;
        }
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [recalculateWidth]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only respond to main button
    if (e.button !== 0) return;
    isDragging.current = true;
    hasMoved.current = false;
    startX.current = e.clientX;
    lastX.current = e.clientX;
    velocity.current = 0;
    setIsGrabbed(true);

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignored if capture unsupported
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !trackRef.current) return;

    const setWidth = singleSetWidth.current;
    if (setWidth <= 0) return;

    const currentX = e.clientX;
    const delta = currentX - lastX.current;
    lastX.current = currentX;

    if (Math.abs(currentX - startX.current) > 3) {
      hasMoved.current = true;
    }

    xPos.current += delta;
    velocity.current = delta; // Record drag velocity for inertia on release

    // Wrap around instantly during drag so it's impossible to reach an edge
    while (xPos.current <= -setWidth) {
      xPos.current += setWidth;
    }
    while (xPos.current > 0) {
      xPos.current -= setWidth;
    }

    trackRef.current.style.transform = `translate3d(${xPos.current}px, 0, 0)`;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setIsGrabbed(false);

    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Ignored
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`relative w-full overflow-hidden select-none py-2 ${
        isGrabbed ? "cursor-grabbing" : "cursor-grab"
      }`}
      style={{ touchAction: "pan-y" }}
    >
      <div
        ref={trackRef}
        className="flex w-max gap-8 items-center whitespace-nowrap will-change-transform"
        style={{ transform: "translate3d(0, 0, 0)" }}
      >
        {logos.map((logo: BrandLogo, i: number) => (
          <div
            key={`${logo.id}-${i}`}
            style={logo.cardBg ? { backgroundColor: logo.cardBg } : undefined}
            className={`inline-flex items-center justify-center shrink-0 w-36 h-20 md:w-44 md:h-24 select-none ${
              logo.cardClassName?.includes("p-") ? "" : "p-3"
            } rounded-2xl ${
              logo.cardClassName?.includes("bg-") ? "" : "bg-white"
            } shadow-sm border border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-glow group overflow-hidden ${
              logo.cardClassName || ""
            }`}
          >
            <img
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              className={`max-h-full max-w-full object-contain filter contrast-105 select-none pointer-events-none transition-transform duration-300 group-hover:scale-105 ${
                logo.imageClassName || ""
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
