import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import stallFabricationWork from "@/assets/stall-fabrication.jpg";
import stall02 from "@/assets/stall/IMG-20240419-WA0083.jpg";

interface StallSlide {
  id: string;
  badge: string;
  tag: string;
  title: string;
  subtitle: string;
  desc: string;
  specs: { label: string; value: string }[];
  image: string;
  accent: string;
  accentColor: string;
  badgeBorder: string;
}

const STALL_SLIDES: StallSlide[] = [
  {
    id: "stall-set-1",
    badge: "★ Flagship Fabrication",
    tag: "Exhibition Architecture · Auto Expo",
    title: "AeroTech 360° Custom Modular Stall",
    subtitle: "Turnkey 3D Exhibition Pavilion",
    desc: "Custom-engineered modular exhibition architecture with precision steel-truss framing, edge-lit fabric displays, and an immersive central product demonstration lounge designed for high footfall and brand engagement.",
    specs: [
      { label: "Footprint", value: "12m × 8m" },
      { label: "Structure", value: "Double-Decker" },
      { label: "Format", value: "Island Pavilion" },
    ],
    image: stallFabricationWork,
    accent: "from-brand-orange to-brand-magenta",
    accentColor: "text-brand-orange",
    badgeBorder: "border-brand-orange/40 text-brand-orange bg-brand-orange/10",
  },
  {
    id: "stall-set-2",
    badge: "★ Bespoke Staging",
    tag: "Precision Engineering · IMTEX Global",
    title: "Eppinger High-Precision Tooling Stall",
    subtitle: "Ergonomic B2B Showcase Architecture",
    desc: "Futuristic architectural geometry featuring continuous overhead cantilever fascia, integrated recessed downlighting, and ergonomic presentation counters tailored for live B2B client meetings and live machinery display.",
    specs: [
      { label: "Footprint", value: "15m × 10m" },
      { label: "Structure", value: "Cantilever Fascia" },
      { label: "Format", value: "Dual-Corner Open" },
    ],
    image: stall02,
    accent: "from-brand-cyan to-brand-blue",
    accentColor: "text-brand-cyan",
    badgeBorder: "border-brand-cyan/40 text-brand-cyan bg-brand-cyan/10",
  },
];

function resolveHeroImage(slide: any) {
  if (!slide) return stallFabricationWork;
  const img = slide.image || "";
  if (img.startsWith("data:") || img.startsWith("http://") || img.startsWith("https://")) {
    return img;
  }
  if (slide.id === "slide_1" || img === "default_hero_1" || img.includes("stall-fabrication")) {
    return stallFabricationWork;
  }
  if (slide.id === "slide_2" || img === "default_hero_2" || img.includes("IMG-20240419-WA0083")) {
    return stall02;
  }
  return img || stallFabricationWork;
}

export function StallHeroCarousel() {
  const [slides, setSlides] = useState<any[]>(STALL_SLIDES);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    fetch("/api/hero-slides")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((d: any) => {
            const acc = d.accent || "from-brand-orange to-brand-magenta";
            const isCyan = acc.includes("cyan");
            return {
              id: d.id,
              badge: d.badge || "★ Flagship Fabrication",
              tag: d.tag || "Exhibition Architecture",
              title: d.title,
              subtitle: d.subtitle || "Turnkey 3D Exhibition Pavilion",
              desc: d.desc || "",
              specs: [
                { label: "Footprint", value: d.footprint || "12m × 8m" },
                { label: "Structure", value: d.structure || "Double-Decker" },
                { label: "Format", value: d.format || "Island Pavilion" },
              ],
              image: resolveHeroImage(d),
              accent: acc,
              accentColor: isCyan ? "text-brand-cyan" : "text-brand-orange",
              badgeBorder: isCyan
                ? "border-brand-cyan/40 text-brand-cyan bg-brand-cyan/10"
                : "border-brand-orange/40 text-brand-orange bg-brand-orange/10",
            };
          });
          setSlides(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const totalSlides = slides.length || 1;

  const nextSlide = () => {
    setCurrentIdx((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIdx((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Auto-slide every 6 seconds when not hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, currentIdx, totalSlides]);

  const slide = slides[currentIdx % totalSlides] || STALL_SLIDES[0];

  return (
    <section
      className="relative w-full min-h-[64vh] lg:h-[78vh] lg:min-h-[540px] lg:max-h-[720px] flex flex-col lg:flex-row items-stretch overflow-hidden noise-bg border-b border-border/30"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* LEFT 50%: The Photo filling the entire 50% of the section from edge to edge */}
      <div className="relative w-full lg:w-1/2 h-[42vh] sm:h-[48vh] lg:h-full overflow-hidden">
        <img
          key={slide.id}
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover object-center transition-all duration-1000 ease-out scale-100 hover:scale-105"
        />

        {/* Ambient Overlays to blend smoothly into the right side */}
        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/30 via-transparent to-background/90 lg:to-background pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/50 pointer-events-none" />

        {/* Badge in the photo corner placed below navbar height */}
        <div className="absolute top-20 sm:top-24 lg:top-24 left-6 lg:left-12 z-20">
          <span
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border backdrop-blur-md transition-colors duration-500 ${slide.badgeBorder}`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
            {slide.badge}
          </span>
        </div>
      </div>

      {/* RIGHT 50%: The Text Content (with top padding to clear floating header) */}
      <div className="relative w-full lg:w-1/2 h-full flex flex-col justify-center px-6 sm:px-10 lg:px-12 xl:px-16 pt-20 sm:pt-24 lg:pt-24 pb-12 sm:pb-14 z-20">
        {/* Ambient Glow */}
        <div
          className={`absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-gradient-to-br ${slide.accent} opacity-15 blur-[100px] pointer-events-none transition-all duration-1000`}
        />

        <div className="max-w-lg">
          {/* Category Tag */}
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-semibold mb-2">
            {slide.tag}
          </p>

          {/* Title & Subtitle */}
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-[1.1] mb-1.5">
            {slide.title}
          </h2>
          <p className={`text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 ${slide.accentColor}`}>
            {slide.subtitle}
          </p>

          {/* Narrative Description */}
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4">
            {slide.desc}
          </p>

          {/* Engineering Specs */}
          <div className="grid grid-cols-3 gap-2.5 mb-6">
            {slide.specs.map((spec: { label: string; value: string }) => (
              <div
                key={spec.label}
                className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-center backdrop-blur-sm"
              >
                <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                  {spec.label}
                </div>
                <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                  {spec.value}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button & Slide Number */}
          <div className="flex items-center gap-5">
            <Link
              to="/contact"
              className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r ${slide.accent} shadow-glow hover:opacity-90 hover:gap-2.5 transition-all`}
            >
              <span>Request Stall Quote</span>
              <ArrowRight size={15} />
            </Link>

            <span className="text-xs font-mono text-muted-foreground">
              <span className="text-white font-bold text-sm">0{currentIdx + 1}</span> / 0{totalSlides}
            </span>
          </div>
        </div>
      </div>

      {/* ARROWS IN LEFT AND RIGHT SIDE CORNERS */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-5 lg:left-6 top-1/2 -translate-y-1/2 z-40 h-11 w-11 sm:h-12 sm:w-12 rounded-full glass border border-white/20 flex items-center justify-center text-white hover:bg-white/25 hover:scale-110 active:scale-95 transition-all shadow-glow backdrop-blur-md cursor-pointer group"
        aria-label="Previous stall"
      >
        <ChevronLeft size={22} className="group-hover:-translate-x-0.5 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-5 lg:right-6 top-1/2 -translate-y-1/2 z-40 h-11 w-11 sm:h-12 sm:w-12 rounded-full glass border border-white/20 flex items-center justify-center text-white hover:bg-white/25 hover:scale-110 active:scale-95 transition-all shadow-glow backdrop-blur-md cursor-pointer group"
        aria-label="Next stall"
      >
        <ChevronRight size={22} className="group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* BOTTOM CENTER SLIDE DOTS */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIdx(i)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === currentIdx ? "w-7 bg-white" : "w-2 bg-white/30 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
