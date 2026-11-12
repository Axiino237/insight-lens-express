import React, { useState, useEffect, useMemo } from "react";
import {
  MapPin,
  Calendar,
  Clock,
  Maximize2,
  CheckCircle2,
  Layers,
  Sparkles,
  Search,
  X,
  ArrowRight,
  Building2,
  Eye,
  ChevronLeft,
  ChevronRight,
  Images,
} from "lucide-react";
import {
  CompletedWork,
  DEFAULT_COMPLETED_WORKS,
  resolveWorkImages,
} from "@/data/completedWorks";

interface WorkCardImageSliderProps {
  images: string[];
  workName: string;
  stallType: string;
  onQuickZoom: () => void;
}

const WorkCardImageSlider: React.FC<WorkCardImageSliderProps> = ({
  images,
  workName,
  stallType,
  onQuickZoom,
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const hasMultiple = images.length > 1;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swiped left -> next
        setActiveIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      } else {
        // Swiped right -> prev
        setActiveIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      }
    }
    setTouchStartX(null);
  };

  return (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden bg-black/60 select-none group/slider"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Active Image */}
      <img
        src={images[activeIdx] || images[0]}
        alt={`${workName} - View ${activeIdx + 1}`}
        className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
        loading="lazy"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

      {/* Top Badges */}
      <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 pointer-events-none z-10">
        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-brand-orange border border-brand-orange/40">
          {stallType}
        </span>
        <div className="flex items-center gap-1.5">
          {hasMultiple && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/20">
              <Images size={11} className="text-brand-yellow" />
              <span>
                {activeIdx + 1}/{images.length}
              </span>
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 backdrop-blur-md text-emerald-300 border border-emerald-500/30">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Delivered
          </span>
        </div>
      </div>

      {/* Prev / Next Buttons (if multiple images) */}
      {hasMultiple && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous photo"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-black/65 hover:bg-black/90 backdrop-blur text-white flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-all duration-200 cursor-pointer shadow-md hover:scale-110 active:scale-95"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next photo"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-black/65 hover:bg-black/90 backdrop-blur text-white flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-all duration-200 cursor-pointer shadow-md hover:scale-110 active:scale-95"
          >
            <ChevronRight size={16} />
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-1.5 z-10 pointer-events-auto">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIdx(i);
                }}
                className={`transition-all duration-200 rounded-full cursor-pointer ${
                  activeIdx === i
                    ? "h-1.5 w-5 bg-brand-orange shadow-glow"
                    : "h-1.5 w-1.5 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Quick Zoom Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onQuickZoom();
        }}
        className="absolute bottom-3 right-3 z-10 p-2 rounded-xl bg-black/60 hover:bg-black/90 backdrop-blur text-white opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer shadow-lg hover:scale-105"
        title="Inspect full stall specification"
      >
        <Eye size={15} />
      </button>
    </div>
  );
};

export const CompletedWorksSection: React.FC = () => {
  const [works, setWorks] = useState<CompletedWork[]>(DEFAULT_COMPLETED_WORKS);
  const [selectedType, setSelectedType] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalWork, setActiveModalWork] = useState<{
    work: CompletedWork;
    index: number;
  } | null>(null);
  const [modalImgIdx, setModalImgIdx] = useState<number>(0);

  useEffect(() => {
    fetch("/api/completed-works")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setWorks(data);
        }
      })
      .catch((err) => {
        console.warn("Could not fetch completed works from backend, using defaults:", err);
      });
  }, []);

  // Compute unique stall types for filter pills
  const availableTypes = useMemo(() => {
    const types = new Set<string>();
    works.forEach((w) => {
      if (w.stallType) types.add(w.stallType.trim());
    });
    return ["All", ...Array.from(types)];
  }, [works]);

  // Filter works by selected category and search query
  const filteredWorks = useMemo(() => {
    return works.filter((w) => {
      const matchesType = selectedType === "All" || w.stallType === selectedType;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesType;

      const matchesSearch =
        w.name.toLowerCase().includes(query) ||
        w.client.toLowerCase().includes(query) ||
        w.place.toLowerCase().includes(query) ||
        w.size.toLowerCase().includes(query) ||
        (w.stallType && w.stallType.toLowerCase().includes(query)) ||
        (w.description && w.description.toLowerCase().includes(query));

      return matchesType && matchesSearch;
    });
  }, [works, selectedType, searchQuery]);

  // Keyboard controls for modal slider
  useEffect(() => {
    if (!activeModalWork) return;
    const modalImages = resolveWorkImages(activeModalWork.work, activeModalWork.index);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalWork(null);
      } else if (e.key === "ArrowLeft") {
        setModalImgIdx((prev) => (prev === 0 ? modalImages.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight") {
        setModalImgIdx((prev) => (prev === modalImages.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalWork]);

  return (
    <section className="py-20 md:py-28 relative overflow-hidden border-t border-border/40 bg-gradient-to-b from-background via-card/10 to-background">
      {/* Subtle background ambient glows */}
      <div className="absolute top-1/4 -left-48 h-96 w-96 rounded-full bg-brand-orange/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 h-96 w-96 rounded-full bg-brand-cyan/10 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
              <Sparkles size={13} />
              Fabrication & Delivery Portfolio
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Completed <span className="text-gradient-warm">Exhibition Works</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Explore custom exhibition stalls, modular booths, and double-decker pavilions designed, fabricated, and handed over on schedule across India’s premier exhibition centres.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city, client, stall..."
              className="w-full rounded-2xl bg-white/[0.05] border border-white/10 pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-orange transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {availableTypes.map((type) => {
            const isActive = selectedType === type;
            const count =
              type === "All"
                ? works.length
                : works.filter((w) => w.stallType === type).length;
            return (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? "bg-gradient-warm text-white shadow-glow"
                    : "bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <span>{type}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                    isActive ? "bg-white/20 text-white" : "bg-white/10 text-gray-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Card Deck Grid (Style C) */}
        {filteredWorks.length === 0 ? (
          <div className="glass rounded-3xl p-12 text-center text-muted-foreground border border-white/10">
            <Layers size={40} className="mx-auto mb-3 opacity-40 text-brand-orange" />
            <h3 className="text-base font-bold text-white mb-1">No completed works matched</h3>
            <p className="text-xs">Try selecting another filter or clearing your search term.</p>
            <button
              onClick={() => {
                setSelectedType("All");
                setSearchQuery("");
              }}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 text-xs font-semibold text-white hover:bg-white/20 transition cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredWorks.map((work, idx) => {
              const images = resolveWorkImages(work, idx);
              return (
                <article
                  key={work.id}
                  className="group glass rounded-3xl overflow-hidden border border-white/10 hover:border-brand-orange/40 transition-all duration-300 flex flex-col hover:shadow-[0_12px_40px_rgba(255,107,0,0.12)] hover:-translate-y-1"
                >
                  {/* Sliding Stall Image Header */}
                  <WorkCardImageSlider
                    images={images}
                    workName={work.name}
                    stallType={work.stallType}
                    onQuickZoom={() => {
                      setActiveModalWork({ work, index: idx });
                      setModalImgIdx(0);
                    }}
                  />

                  {/* Card Body & Specs */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Client Name */}
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-orange mb-1">
                        <Building2 size={13} className="flex-shrink-0" />
                        <span className="truncate">{work.client}</span>
                      </div>

                      {/* Stall Title */}
                      <h3 className="font-display text-lg font-bold text-white group-hover:text-brand-orange transition-colors line-clamp-1 mb-4">
                        {work.name}
                      </h3>

                      {/* Technical Specs Grid */}
                      <div className="grid grid-cols-2 gap-2.5 p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 mb-4 text-xs">
                        {/* Place */}
                        <div className="flex items-start gap-2">
                          <MapPin size={14} className="text-brand-cyan flex-shrink-0 mt-0.5" />
                          <div className="min-w-0">
                            <span className="block text-[10px] uppercase font-bold text-muted-foreground">
                              Location
                            </span>
                            <span className="font-medium text-gray-200 line-clamp-1" title={work.place}>
                              {work.place}
                            </span>
                          </div>
                        </div>

                        {/* Size */}
                        <div className="flex items-start gap-2">
                          <Maximize2 size={14} className="text-brand-yellow flex-shrink-0 mt-0.5" />
                          <div className="min-w-0">
                            <span className="block text-[10px] uppercase font-bold text-muted-foreground">
                              Dimensions
                            </span>
                            <span className="font-medium text-gray-200 line-clamp-1" title={work.size}>
                              {work.size}
                            </span>
                          </div>
                        </div>

                        {/* Date */}
                        <div className="flex items-start gap-2">
                          <Calendar size={14} className="text-brand-magenta flex-shrink-0 mt-0.5" />
                          <div className="min-w-0">
                            <span className="block text-[10px] uppercase font-bold text-muted-foreground">
                              Delivered
                            </span>
                            <span className="font-medium text-gray-200 truncate">
                              {work.date}
                            </span>
                          </div>
                        </div>

                        {/* Time / Duration */}
                        <div className="flex items-start gap-2">
                          <Clock size={14} className="text-brand-green flex-shrink-0 mt-0.5" />
                          <div className="min-w-0">
                            <span className="block text-[10px] uppercase font-bold text-muted-foreground">
                              Duration
                            </span>
                            <span className="font-medium text-gray-200 truncate">
                              {work.time}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Description snippet */}
                      {work.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                          {work.description}
                        </p>
                      )}
                    </div>

                    {/* Card Actions Footer */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveModalWork({ work, index: idx });
                          setModalImgIdx(0);
                        }}
                        className="text-gray-300 hover:text-white inline-flex items-center gap-1 font-semibold transition cursor-pointer"
                      >
                        <span>View Details ({images.length} photos)</span>
                        <ArrowRight size={13} />
                      </button>

                      <a
                        href="/contact"
                        className="text-brand-orange hover:text-white font-semibold transition"
                      >
                        Request Quote →
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* FULL SPECIFICATION LIGHTBOX MODAL WITH MULTI-IMAGE SLIDER */}
      {activeModalWork && (() => {
        const modalImages = resolveWorkImages(activeModalWork.work, activeModalWork.index);
        const hasMultipleModal = modalImages.length > 1;

        const handleModalPrev = () => {
          setModalImgIdx((prev) => (prev === 0 ? modalImages.length - 1 : prev - 1));
        };

        const handleModalNext = () => {
          setModalImgIdx((prev) => (prev === modalImages.length - 1 ? 0 : prev + 1));
        };

        return (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            onClick={() => setActiveModalWork(null)}
          >
            <div
              className="relative w-full max-w-4xl glass rounded-3xl border border-white/20 shadow-2xl overflow-hidden bg-background/95 my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveModalWork(null)}
                className="absolute top-4 right-4 z-30 h-10 w-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {/* Modal Slider Screen */}
              <div className="relative aspect-[16/9] w-full max-h-[460px] bg-black overflow-hidden flex items-center justify-center group/modal">
                <img
                  src={modalImages[modalImgIdx] || modalImages[0]}
                  alt={`${activeModalWork.work.name} - Angle ${modalImgIdx + 1}`}
                  className="w-full h-full object-contain transition-all duration-300"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                  <span className="text-xs uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-brand-orange text-white shadow-glow">
                    {activeModalWork.work.stallType}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md text-emerald-300 border border-emerald-500/40">
                    <CheckCircle2 size={13} />
                    Completed & Handed Over
                  </span>
                </div>

                {/* Photo Counter Pill */}
                {hasMultipleModal && (
                  <div className="absolute top-4 right-16 z-20">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-white border border-white/20">
                      <Images size={13} className="text-brand-yellow" />
                      <span>
                        Photo {modalImgIdx + 1} of {modalImages.length}
                      </span>
                    </span>
                  </div>
                )}

                {/* Modal Navigation Arrows */}
                {hasMultipleModal && (
                  <>
                    <button
                      type="button"
                      onClick={handleModalPrev}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition cursor-pointer shadow-lg hover:scale-105 active:scale-95"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft size={22} />
                    </button>
                    <button
                      type="button"
                      onClick={handleModalNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-11 w-11 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition cursor-pointer shadow-lg hover:scale-105 active:scale-95"
                      aria-label="Next photo"
                    >
                      <ChevronRight size={22} />
                    </button>
                  </>
                )}

                {/* Modal Thumbnail Strip */}
                {hasMultipleModal && (
                  <div className="absolute bottom-3 inset-x-0 z-20 flex items-center justify-center gap-2 px-4 overflow-x-auto py-1">
                    {modalImages.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setModalImgIdx(i)}
                        className={`relative h-12 w-18 rounded-lg overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0 ${
                          modalImgIdx === i
                            ? "border-brand-orange scale-105 shadow-glow ring-2 ring-brand-orange/40"
                            : "border-white/30 opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img src={img} alt={`Thumb ${i + 1}`} className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-brand-orange mb-1">
                      <Building2 size={14} />
                      <span>{activeModalWork.work.client}</span>
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                      {activeModalWork.work.name}
                    </h3>
                  </div>

                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-warm text-white font-semibold text-xs shadow-glow hover:opacity-90 transition cursor-pointer whitespace-nowrap self-start"
                  >
                    <span>Enquire About Similar Stall</span>
                    <ArrowRight size={14} />
                  </a>
                </div>

                {/* Full Specs List */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-white/10 text-xs">
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-muted-foreground font-bold mb-1">
                      Venue / City
                    </span>
                    <span className="text-white font-medium flex items-center gap-1.5">
                      <MapPin size={13} className="text-brand-cyan" />
                      {activeModalWork.work.place}
                    </span>
                  </div>

                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-muted-foreground font-bold mb-1">
                      Footprint
                    </span>
                    <span className="text-white font-medium flex items-center gap-1.5">
                      <Maximize2 size={13} className="text-brand-yellow" />
                      {activeModalWork.work.size}
                    </span>
                  </div>

                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-muted-foreground font-bold mb-1">
                      Execution Date
                    </span>
                    <span className="text-white font-medium flex items-center gap-1.5">
                      <Calendar size={13} className="text-brand-magenta" />
                      {activeModalWork.work.date}
                    </span>
                  </div>

                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-muted-foreground font-bold mb-1">
                      Expo Duration
                    </span>
                    <span className="text-white font-medium flex items-center gap-1.5">
                      <Clock size={13} className="text-brand-green" />
                      {activeModalWork.work.time}
                    </span>
                  </div>
                </div>

                {/* Scope & Description */}
                {activeModalWork.work.description && (
                  <div className="pt-6">
                    <h4 className="text-xs uppercase tracking-wider text-brand-orange font-bold mb-2">
                      Fabrication & Turnkey Scope
                    </h4>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {activeModalWork.work.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
};
