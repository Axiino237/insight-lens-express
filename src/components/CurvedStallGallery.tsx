import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X, Maximize2, Sparkles } from "lucide-react";
import { resolveStallImage } from "@/data/stallImages";

// Import all 19 images from src/assets/stall
import stall01 from "@/assets/stall/IMG-20240419-WA0082.jpg";
import stall02 from "@/assets/stall/IMG-20240419-WA0083.jpg";
import stall03 from "@/assets/stall/IMG-20240419-WA0088.jpg";
import stall04 from "@/assets/stall/IMG-20240419-WA0108.jpg";
import stall05 from "@/assets/stall/IMG-20250702-WA0053.jpg";
import stall06 from "@/assets/stall/IMG-20250702-WA0054.jpg";
import stall07 from "@/assets/stall/IMG_9125.PNG";
import stall08 from "@/assets/stall/IMG_9126.PNG";
import stall09 from "@/assets/stall/IMG_9127.PNG";
import stall10 from "@/assets/stall/IMG_9129.PNG";
import stall11 from "@/assets/stall/IMG_9130.PNG";
import stall12 from "@/assets/stall/Screenshot_20250704_220106.jpg";
import stall13 from "@/assets/stall/Screenshot_20250704_220131.jpg";
import stall14 from "@/assets/stall/Screenshot_20250704_222302.jpg";
import stall15 from "@/assets/stall/Screenshot_20250704_223741.jpg";
import stall16 from "@/assets/stall/Screenshot_20250704_223749.jpg";
import stall17 from "@/assets/stall/Screenshot_20250704_223758.jpg";
import stall18 from "@/assets/stall/Screenshot_20250704_224515.jpg";
import stall19 from "@/assets/stall/Screenshot_20250704_224556.jpg";

const STALL_ITEMS = [
  { id: 1, img: stall01, title: "Modern Industrial Booth", tag: "Custom Fabrication" },
  { id: 2, img: stall02, title: "Dynamic Product Pavilion", tag: "Exhibition Stall" },
  { id: 3, img: stall03, title: "Acoustic & Tech Display", tag: "Trade Show" },
  { id: 4, img: stall04, title: "Premium Expo Setup", tag: "Modular Booth" },
  { id: 5, img: stall05, title: "Corporate Experience Center", tag: "Exhibition Stall" },
  { id: 6, img: stall06, title: "Futuristic Brand Booth", tag: "Custom Fabrication" },
  { id: 7, img: stall07, title: "Grand Atrium Pavilion", tag: "Trade Show" },
  { id: 8, img: stall08, title: "High-Impact Product Display", tag: "Expo Stall" },
  { id: 9, img: stall09, title: "Illuminated Truss Stall", tag: "Custom Fabrication" },
  { id: 10, img: stall10, title: "Interactive Product Lounge", tag: "Exhibition Stall" },
  { id: 11, img: stall11, title: "Open-Concept Showcase", tag: "Trade Show" },
  { id: 12, img: stall12, title: "Architectural Exhibition Stand", tag: "Custom Fabrication" },
  { id: 13, img: stall13, title: "Curved LED Pavilion", tag: "Expo Stall" },
  { id: 14, img: stall14, title: "Multi-Tiered Display Center", tag: "Exhibition Stall" },
  { id: 15, img: stall15, title: "Precision Brand Showcase", tag: "Custom Fabrication" },
  { id: 16, img: stall16, title: "Elevated Expo Experience", tag: "Trade Show" },
  { id: 17, img: stall17, title: "Immersive Retail Booth", tag: "Modular Booth" },
  { id: 18, img: stall18, title: "Sleek Minimalist Stall", tag: "Exhibition Stall" },
  { id: 19, img: stall19, title: "Signature Event Pavilion", tag: "Custom Fabrication" },
];

const N = STALL_ITEMS.length; // 19 slides
const STEP_ANGLE = 360 / N; // ~18.947 degrees per slide

export function CurvedStallGallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [items, setItems] = useState(STALL_ITEMS);

  useEffect(() => {
    fetch("/api/showcase")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((d: any, idx: number) => ({
            id: d.id || idx + 1,
            img: resolveStallImage(d, idx),
            title: d.name,
            tag: d.classification,
          }));
          setItems(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const n = items.length;
  const stepAngle = 360 / Math.max(1, n);

  // Responsive dimensions for inward (concave) cylinder (40% smaller overall)
  const [dims, setDims] = useState({
    cardWidth: 175,
    cardHeight: 250,
    radius: 580, // Scaled with cards to keep proportional (~18px) gap between slides
    cardsTop: 75, // Extra top space so 3D rotated edge slides never clip at the top
    stageHeight: 460,
  });

  // Animation & Physics Refs
  const currentRotationRef = useRef(0);
  const ringRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const hasMovedSignificantlyRef = useRef(false);
  const isHoveredRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  // Resize handler for responsive cylinder
  useEffect(() => {
    const updateDims = () => {
      const isMobile = window.innerWidth < 768;
      const cardWidth = isMobile ? 140 : 175;
      const cardHeight = isMobile ? 200 : 250;
      // Inward radius scaled proportionally with cards (~40% smaller)
      const radius = isMobile ? 460 : 580;
      // 75px (desktop) / 65px (mobile) top space gives ample room above cards
      const cardsTop = isMobile ? 65 : 75;
      // Scene height: cardsTop + card + 4px gap + 45% floor reflection + bottom clearance
      const stageHeight = cardsTop + cardHeight + 4 + Math.round(cardHeight * 0.45) + (isMobile ? 12 : 18);

      setDims({ cardWidth, cardHeight, radius, cardsTop, stageHeight });
    };

    updateDims();
    window.addEventListener("resize", updateDims);
    return () => window.removeEventListener("resize", updateDims);
  }, []);

  // Continuous marquee animation loop with inertia physics & pointer drag
  useEffect(() => {
    let animationFrameId: number;
    const baseSpeed = 0.06; // Continuous marquee rotation speed (deg/frame)

    const loop = () => {
      if (!isDraggingRef.current) {
        // If user flicked with mouse, apply smooth friction decay
        if (Math.abs(velocityRef.current) > 0.02) {
          currentRotationRef.current += velocityRef.current;
          velocityRef.current *= 0.94; // friction decay
        } else {
          velocityRef.current = 0;
          // Constant marquee auto-rotation (paused only when lightbox modal is open)
          if (!selectedImage) {
            currentRotationRef.current -= baseSpeed;
          }
        }
      }

      // Inward Concave Curve:
      // Ring container has translateZ(+radius) so center card is at comfortable depth (Z=0)
      if (ringRef.current) {
        ringRef.current.style.transform = `translateZ(var(--cylinder-radius, ${dims.radius}px)) rotateY(${currentRotationRef.current}deg)`;
      }

      // Calculate active center index
      const normalizedAngle = ((-currentRotationRef.current % 360) + 360) % 360;
      const rawIdx = Math.round(normalizedAngle / stepAngle) % n;
      setActiveIdx((prev) => (prev !== rawIdx ? rawIdx : prev));

      // Update per-card opacities based on relative angle to camera
      const cardNodes = ringRef.current?.querySelectorAll<HTMLElement>(".card-3d-wrapper");
      if (cardNodes) {
        cardNodes.forEach((node, i) => {
          const cardAngle = i * stepAngle;
          const relAngle = ((cardAngle + currentRotationRef.current) % 360 + 540) % 360 - 180;
          const absAngle = Math.abs(relAngle);

          // Fade far-side cards smoothly based on angle; hide backside cards completely
          const opacity =
            absAngle > 80 ? 0 : Math.max(0, Math.min(1, 1 - Math.pow(absAngle / 75, 2) * 0.9));
          node.style.opacity = `${opacity}`;
          node.style.pointerEvents = absAngle > 65 ? "none" : "auto";
        });
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dims.radius, selectedImage]);

  // Impulse navigation controls (momentum flick forward or backward)
  const prevSlide = useCallback(() => {
    velocityRef.current = 1.4; // Flick backward
  }, []);

  const nextSlide = useCallback(() => {
    velocityRef.current = -1.4; // Flick forward
  }, []);

  // Pointer drag interaction handlers (matching BrandMarquee physics)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    isDraggingRef.current = true;
    hasMovedSignificantlyRef.current = false;
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    velocityRef.current = 0;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignored if capture unsupported
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const currentX = e.clientX;
    const deltaX = currentX - lastXRef.current;
    lastXRef.current = currentX;

    if (Math.abs(currentX - startXRef.current) > 4) {
      hasMovedSignificantlyRef.current = true;
    }

    // Degree rotation per dragged pixel: proportional to cylinder radius
    const degPerPixel = (360 / (2 * Math.PI * dims.radius)) * 1.35;
    const angleDelta = deltaX * degPerPixel;

    currentRotationRef.current += angleDelta;
    velocityRef.current = angleDelta; // Record drag velocity for release inertia
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Ignored
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage) {
        if (e.key === "Escape") setSelectedImage(null);
        return;
      }
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, selectedImage]);

  return (
    <section className="relative py-8 md:py-12 overflow-x-clip overflow-y-visible select-none bg-black">
      {/* Header text container */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 text-center mb-6 md:mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-0.5 mb-3 backdrop-blur">
          <Sparkles size={12} className="text-brand-orange animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
            Exhibition & Stall Showcase
          </span>
        </div>

        <h2 className="font-display text-2xl md:text-4xl font-extrabold leading-tight tracking-tight max-w-2xl mx-auto">
          Explore spaces where brands{" "}
          <span className="text-gradient-warm">come to life.</span>
        </h2>

        <p className="mt-2 text-xs md:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Step into our spatial 3D panoramic showcase of 120+ bespoke trade show booths and custom exhibition architecture.
        </p>
      </div>

      {/* 1. STAGE CONTAINER (.carousel-stage) with perspective & CSS variables (overflow-y visible prevents top clipping) */}
      <div
        className="carousel-stage relative w-full select-none cursor-grab active:cursor-grabbing"
        style={{
          "--card-w": `${dims.cardWidth}px`,
          "--card-h": `${dims.cardHeight}px`,
          "--cylinder-radius": `${dims.radius}px`,
          height: `${dims.stageHeight}px`,
          perspective: "1400px",
          perspectiveOrigin: "50% 50%",
          overflowX: "clip",
          overflowY: "visible",
          touchAction: "pan-y",
        } as React.CSSProperties}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Soft dark gradient at bottom of scene so reflection blends smoothly into glossy black floor */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none z-10"
          style={{
            height: "80px",
            background: "linear-gradient(to top, #000000 0%, rgba(0,0,0,0.7) 40%, transparent 100%)",
          }}
        />

        {/* INWARD (CONCAVE) RING CONTAINER */}
        <div
          ref={ringRef}
          style={{
            position: "absolute",
            left: "50%",
            top: `${dims.cardsTop}px`,
            marginLeft: "calc(-0.5 * var(--card-w))",
            width: "var(--card-w)",
            height: "var(--card-h)",
            transformStyle: "preserve-3d",
            transform: `translateZ(var(--cylinder-radius)) rotateY(0deg)`,
            willChange: "transform",
          }}
        >
          {items.map((item, i) => {
            const cardAngle = i * stepAngle;

            return (
              <div
                key={item.id}
                className="card-3d-wrapper"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "var(--card-w)",
                  height: "var(--card-h)",
                  // Inward curve: rotateY(angle) translateZ(-radius)
                  transform: `rotateY(${cardAngle}deg) translateZ(calc(-1 * var(--cylinder-radius)))`,
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transformOrigin: "center center",
                  transition: "opacity 0.25s ease",
                  willChange: "transform, opacity",
                }}
              >
                {/* Main Card - Sharp plain rectangular photo panel with 0 border-radius */}
                <div
                  onClick={() => {
                    if (hasMovedSignificantlyRef.current) return;
                    if (activeIdx === i) {
                      setSelectedImage(item.img);
                    } else {
                      // Smoothly flick towards the clicked card
                      let diff = (-cardAngle - currentRotationRef.current) % 360;
                      if (diff > 180) diff -= 360;
                      if (diff < -180) diff += 360;
                      velocityRef.current = diff * 0.15;
                    }
                  }}
                  className={`card-main relative w-full h-full rounded-none overflow-hidden border transition-colors duration-300 ${
                    activeIdx === i
                      ? "border-white/40 cursor-pointer"
                      : "border-white/10 hover:border-white/25 cursor-pointer"
                  }`}
                  style={{
                    backgroundColor: "#0d0d11",
                    borderRadius: 0,
                  }}
                >
                  {/* Stall Image */}
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none rounded-none"
                    style={{ borderRadius: 0 }}
                  />

                  {/* Dark vignette gradient at bottom for text readability */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none rounded-none"
                    style={{ borderRadius: 0 }}
                  />

                  {/* Card Tag & Info at bottom */}
                  <div className="absolute bottom-0 inset-x-0 p-3 flex flex-col justify-end pointer-events-none">
                    <span className="text-[9px] font-semibold uppercase tracking-wider text-brand-orange mb-0.5">
                      {item.tag}
                    </span>
                    <h3 className="font-display font-bold text-xs text-foreground line-clamp-1">
                      {item.title}
                    </h3>
                  </div>

                  {/* Center Card Zoom Icon Indicator */}
                  {activeIdx === i && (
                    <div
                      className="absolute top-2.5 right-2.5 h-6 w-6 rounded-none bg-black/60 border border-white/20 flex items-center justify-center text-white/80 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      style={{ borderRadius: 0 }}
                    >
                      <Maximize2 size={12} />
                    </div>
                  )}
                </div>

                {/* Mirror reflection directly below this card in 3D - sharp rectangular panel */}
                <div
                  className="card-reflection absolute left-0 right-0 overflow-hidden pointer-events-none rounded-none"
                  style={{
                    top: "calc(var(--card-h) + 4px)",
                    height: "calc(var(--card-h) * 0.45)",
                    opacity: 0.38,
                    filter: "blur(1.5px)",
                    borderRadius: 0,
                    WebkitMaskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.45) 25%, transparent 100%)",
                    maskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.45) 25%, transparent 100%)",
                  }}
                >
                  <img
                    src={item.img}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="w-full object-cover pointer-events-none rounded-none"
                    style={{
                      height: "var(--card-h)",
                      transform: "scaleY(-1)",
                      transformOrigin: "center center",
                      borderRadius: 0,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation controls & indicators */}
      <div className="relative z-20 flex items-center justify-center gap-3 mt-4">
        <button
          onClick={prevSlide}
          className="h-9 w-9 rounded-full bg-white/5 border border-white/10 hover:border-white/20 flex items-center justify-center text-foreground hover:bg-white/10 transition active:scale-95"
          aria-label="Previous stall"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="text-xs font-mono text-muted-foreground px-3 py-1 rounded-full bg-white/5 border border-white/5">
          <span className="text-foreground font-semibold">{activeIdx + 1}</span> / {items.length}
        </div>

        <button
          onClick={nextSlide}
          className="h-9 w-9 rounded-full bg-white/5 border border-white/10 hover:border-white/20 flex items-center justify-center text-foreground hover:bg-white/10 transition active:scale-95"
          aria-label="Next stall"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Lightbox / Fullscreen Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 h-12 w-12 rounded-full glass border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition z-50"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
          <div
            className="relative max-w-5xl max-h-[85vh] rounded-3xl overflow-hidden glass border border-white/20 shadow-glow"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Stall high resolution view"
              className="w-full h-full object-contain max-h-[85vh]"
            />
          </div>
        </div>
      )}
    </section>
  );
}
