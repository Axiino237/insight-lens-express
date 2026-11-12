import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Sparkles,
  Layers,
  ArrowLeftRight,
  Maximize2,
  CheckCircle2,
  Box,
  Building2,
  MapPin,
} from "lucide-react";
import {
  StallComparisonConfig,
  DEFAULT_STALL_COMPARISON,
  resolveComparisonRender,
  resolveComparisonExecuted,
} from "@/data/stallComparison";

export const StallComparisonSlider: React.FC = () => {
  const [comparison, setComparison] = useState<StallComparisonConfig>(DEFAULT_STALL_COMPARISON);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/stall-comparison")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && (data.renderImage || data.executedImage)) {
          setComparison(data);
        }
      })
      .catch((err) => {
        console.warn("Could not fetch stall comparison data, using default:", err);
      });
  }, []);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  }, [handleMove]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    handleMove(e.clientX);
  };

  const renderSrc = resolveComparisonRender(comparison.renderImage);
  const executedSrc = resolveComparisonExecuted(comparison.executedImage);

  return (
    <section className="py-20 md:py-28 relative overflow-hidden border-t border-border/40 bg-gradient-to-b from-background via-card/15 to-background">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-48 h-96 w-96 rounded-full bg-brand-cyan/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 h-96 w-96 rounded-full bg-brand-orange/10 blur-[130px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
              <Sparkles size={13} />
              1:1 Execution Fidelity
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              From 3D Blueprint to <span className="text-gradient-warm">Flawless Reality</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Drag the interactive slider horizontally to compare our initial 3D architectural CAD render against the actual physical booth fabricated and delivered on-site.
            </p>
          </div>

          {/* Quick Snap Preset Buttons */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl glass border border-white/10 self-start md:self-end">
            <button
              onClick={() => setSliderPosition(100)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                sliderPosition === 100
                  ? "bg-brand-cyan text-black font-bold shadow-glow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              3D Render
            </button>
            <button
              onClick={() => setSliderPosition(50)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                sliderPosition === 50
                  ? "bg-brand-orange text-white font-bold shadow-glow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              50 / 50
            </button>
            <button
              onClick={() => setSliderPosition(0)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                sliderPosition === 0
                  ? "bg-emerald-500 text-black font-bold shadow-glow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Executed Stall
            </button>
          </div>
        </div>

        {/* COMPARISON SLIDER STAGE */}
        <div className="max-w-4xl mx-auto glass rounded-3xl p-4 sm:p-5 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          {/* Top Project Label Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <Building2 size={14} className="text-brand-orange" />
              <span className="font-bold text-white text-sm sm:text-base">
                {comparison.title}
              </span>
              <span className="text-muted-foreground hidden sm:inline">·</span>
              <span className="text-gray-300 hidden sm:inline">{comparison.client}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin size={13} className="text-brand-cyan" />
              <span>{comparison.venue}</span>
            </div>
          </div>

          {/* Interactive Comparison Canvas */}
          <div
            ref={containerRef}
            onClick={handleClick}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchMove={handleTouchMove}
            className="relative aspect-[16/10] md:aspect-auto md:h-[400px] lg:h-[450px] w-full overflow-hidden rounded-2xl select-none cursor-ew-resize bg-black shadow-2xl group"
          >
            {/* UNDER LAYER: Physical Executed Stall (Right Side) */}
            <img
              src={executedSrc}
              alt="Actual executed physical stall"
              className="absolute inset-0 h-full w-full object-cover pointer-events-none"
              draggable={false}
            />

            {/* OVER LAYER: 3D CAD Concept Render (Left Side, clipped) */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
              }}
            >
              <img
                src={renderSrc}
                alt="3D CAD architectural stall render"
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>

            {/* DIVIDER VERTICAL LINE */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_15px_rgba(255,255,255,0.9)] pointer-events-none z-20"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Circular Drag Handle */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-11 w-11 sm:h-13 sm:w-13 rounded-full bg-white text-black flex items-center justify-center shadow-[0_4px_25px_rgba(0,0,0,0.8)] border-2 border-brand-orange transition-transform group-hover:scale-105 active:scale-95"
              >
                <ArrowLeftRight size={18} className="text-brand-orange animate-pulse" />
              </div>
            </div>

            {/* FLOATING BADGES (LEFT & RIGHT) */}
            {/* Left: 3D Render Label */}
            <div
              className={`absolute top-4 left-4 z-10 transition-opacity duration-300 pointer-events-none ${
                sliderPosition < 15 ? "opacity-20" : "opacity-100"
              }`}
            >
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-brand-cyan/40 text-brand-cyan text-xs font-bold shadow-lg">
                <Box size={13} />
                <span>3D CAD Model (Concept)</span>
              </div>
            </div>

            {/* Right: Executed Stall Label */}
            <div
              className={`absolute top-4 right-4 z-10 transition-opacity duration-300 pointer-events-none ${
                sliderPosition > 85 ? "opacity-20" : "opacity-100"
              }`}
            >
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-emerald-500/40 text-emerald-400 text-xs font-bold shadow-lg">
                <CheckCircle2 size={13} />
                <span>Real Executed Stall (Delivered)</span>
              </div>
            </div>

            {/* Bottom Drag Helper Notice */}
            <div className="absolute bottom-4 inset-x-0 flex justify-center pointer-events-none z-10">
              <span className="px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] text-gray-300 font-medium">
                ◀ Drag or swipe to compare 3D Render vs. Real Stall ▶
              </span>
            </div>
          </div>
        </div>

        {/* 3 Proof-Point Pillars Below Comparison */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl glass border border-white/10 flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-brand-cyan/20 border border-brand-cyan/30 text-brand-cyan flex items-center justify-center flex-shrink-0">
              <Maximize2 size={18} />
            </div>
            <div>
              <h4 className="font-display text-sm font-bold text-white mb-1">
                100% Dimensional Accuracy
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Precision CNC cutting, laser-routed aluminum fascia, and load-bearing truss structures match digital blueprints millimeter for millimeter.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl glass border border-white/10 flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-brand-orange/20 border border-brand-orange/30 text-brand-orange flex items-center justify-center flex-shrink-0">
              <Sparkles size={18} />
            </div>
            <div>
              <h4 className="font-display text-sm font-bold text-white mb-1">
                Material & Lighting Realism
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Architectural edge-lit acrylics, tension-fabric portals, and warm VIP lounges built exactly as simulated in our 3D visualization.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl glass border border-white/10 flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <h4 className="font-display text-sm font-bold text-white mb-1">
                24-Hour Pre-Expo Handover
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Fully fabricated, cleaned, and electricals safety-certified a full day prior to exhibition inauguration for zero-stress client walkthroughs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

