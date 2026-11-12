import React, { useState, useEffect, useMemo } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Search,
  X,
  ExternalLink,
  Sparkles,
  Building2,
  CalendarDays,
  ArrowRight,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  UpcomingExpo,
  DEFAULT_UPCOMING_EXPOS,
} from "@/data/upcomingExpos";

const ITEMS_PER_PAGE = 4;

export const UpcomingExposTable: React.FC = () => {
  const [expos, setExpos] = useState<UpcomingExpo[]>(DEFAULT_UPCOMING_EXPOS);
  const [selectedSector, setSelectedSector] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    fetch("/api/upcoming-expos")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setExpos(data);
        }
      })
      .catch((err) => {
        console.warn("Could not fetch upcoming expos from backend, using defaults:", err);
      });
  }, []);

  // Compute unique sectors for filter pills
  const availableSectors = useMemo(() => {
    const sectors = new Set<string>();
    expos.forEach((e) => {
      if (e.sector) sectors.add(e.sector.trim());
    });
    return ["All", ...Array.from(sectors)];
  }, [expos]);

  // Filter expos by sector and search query
  const filteredExpos = useMemo(() => {
    return expos.filter((e) => {
      const matchesSector = selectedSector === "All" || e.sector === selectedSector;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesSector;

      const matchesSearch =
        e.name.toLowerCase().includes(query) ||
        e.sector.toLowerCase().includes(query) ||
        e.place.toLowerCase().includes(query) ||
        e.city.toLowerCase().includes(query) ||
        (e.edition && e.edition.toLowerCase().includes(query));

      return matchesSector && matchesSearch;
    });
  }, [expos, selectedSector, searchQuery]);

  // Reset to page 1 whenever filters or total items change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSector, searchQuery, expos.length]);

  const totalPages = Math.max(1, Math.ceil(filteredExpos.length / ITEMS_PER_PAGE));

  const paginatedExpos = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredExpos.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredExpos, currentPage]);

  // Color helper for status pills
  const getStatusBadge = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes("open") || s.includes("early")) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {status}
        </span>
      );
    }
    if (s.includes("active") || s.includes("design")) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
          {status}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
        {status}
      </span>
    );
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden border-t border-border/40 bg-gradient-to-b from-background via-card/10 to-background">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -right-48 h-96 w-96 rounded-full bg-brand-orange/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/3 -left-48 h-96 w-96 rounded-full bg-brand-cyan/10 blur-[130px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
              <CalendarDays size={13} />
              Exhibition Calendar 2025–2026
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Upcoming <span className="text-gradient-warm">Expos</span> & Trade Shows
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Book your turnkey exhibition stall design, fabrication, and on-site handover in advance for upcoming premier expos across India.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search expo, city, or sector..."
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

        {/* Sector Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mr-1 flex-shrink-0">
            <Filter size={13} />
            <span>Sectors:</span>
          </div>
          {availableSectors.map((sector) => {
            const isActive = selectedSector === sector;
            const count =
              sector === "All"
                ? expos.length
                : expos.filter((e) => e.sector === sector).length;
            return (
              <button
                key={sector}
                onClick={() => setSelectedSector(sector)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer flex-shrink-0 ${
                  isActive
                    ? "bg-gradient-warm text-white shadow-glow"
                    : "bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <span>{sector}</span>
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

        {/* TABLE VIEW (DESKTOP & TABLET: md and up) */}
        <div className="hidden md:block">
          <div className="glass rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.04] text-[11px] uppercase tracking-wider text-muted-foreground">
                    <th className="py-3.5 px-4 font-bold">Expo & Edition</th>
                    <th className="py-3.5 px-4 font-bold">Sector / Industry</th>
                    <th className="py-3.5 px-4 font-bold">Dates</th>
                    <th className="py-3.5 px-4 font-bold">Time / Duration</th>
                    <th className="py-3.5 px-4 font-bold">Venue & City</th>
                    <th className="py-3.5 px-4 font-bold">Status</th>
                    <th className="py-3.5 px-4 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {paginatedExpos.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-muted-foreground">
                        <CalendarDays size={36} className="mx-auto mb-2 opacity-40 text-brand-orange" />
                        <p className="text-sm font-semibold text-white">No upcoming expos found</p>
                        <p className="text-xs mt-1">Try clearing your search query or selecting "All" sectors.</p>
                      </td>
                    </tr>
                  ) : (
                    paginatedExpos.map((expo) => (
                      <tr
                        key={expo.id}
                        className="group hover:bg-white/[0.03] transition-colors duration-200"
                      >
                        {/* Expo Name & Edition */}
                        <td className="py-4 px-4 max-w-[200px]">
                          <div className="font-display font-bold text-white group-hover:text-brand-orange transition-colors leading-snug">
                            {expo.name}
                          </div>
                          {expo.edition && (
                            <div className="text-[11px] text-muted-foreground mt-0.5">
                              {expo.edition}
                            </div>
                          )}
                        </td>

                        {/* Sector */}
                        <td className="py-4 px-4">
                          <span
                            className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-200 max-w-[180px] truncate"
                            title={expo.sector}
                          >
                            {expo.sector}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                            <Calendar size={13} className="text-brand-orange flex-shrink-0" />
                            <span>{expo.date}</span>
                          </div>
                        </td>

                        {/* Time / Duration */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-xs text-gray-300">
                            <Clock size={13} className="text-brand-cyan flex-shrink-0" />
                            <span>{expo.time}</span>
                          </div>
                        </td>

                        {/* Venue & City */}
                        <td className="py-4 px-4 max-w-[190px]">
                          <div className="flex items-start gap-1.5 text-xs text-gray-200">
                            <MapPin size={13} className="text-brand-yellow flex-shrink-0 mt-0.5" />
                            <div className="min-w-0">
                              <span className="font-semibold block">{expo.city}</span>
                              <span className="text-[11px] text-muted-foreground line-clamp-1" title={expo.place}>
                                {expo.place}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          {getStatusBadge(expo.status)}
                        </td>

                        {/* Action CTA */}
                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          <a
                            href={`/contact?subject=Stall+Fabrication+for+${encodeURIComponent(expo.name)}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-warm text-xs font-semibold text-white shadow-glow hover:opacity-90 transition cursor-pointer"
                          >
                            <span>Book Stall</span>
                            <ArrowRight size={12} />
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* MOBILE VIEW (CARDS: below md) */}
        <div className="md:hidden space-y-4">
          {paginatedExpos.length === 0 ? (
            <div className="glass rounded-3xl p-8 text-center text-muted-foreground border border-white/10">
              <CalendarDays size={32} className="mx-auto mb-2 opacity-40 text-brand-orange" />
              <p className="text-sm font-semibold text-white">No upcoming expos found</p>
              <p className="text-xs mt-1">Try clearing your search query.</p>
            </div>
          ) : (
            paginatedExpos.map((expo) => (
              <div
                key={expo.id}
                className="glass rounded-2xl p-5 border border-white/10 hover:border-brand-orange/40 transition space-y-3"
              >
                {/* Header: Title + Status */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-orange">
                      {expo.sector}
                    </span>
                    <h3 className="font-display text-base font-bold text-white leading-snug">
                      {expo.name}
                    </h3>
                    {expo.edition && (
                      <span className="text-[11px] text-muted-foreground">
                        {expo.edition}
                      </span>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    {getStatusBadge(expo.status)}
                  </div>
                </div>

                {/* Specs List */}
                <div className="grid grid-cols-1 gap-2 pt-2 border-t border-white/5 text-xs text-gray-300">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-brand-orange flex-shrink-0" />
                    <span className="font-semibold text-white">{expo.date}</span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-muted-foreground">{expo.time}</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin size={14} className="text-brand-yellow flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white">{expo.city}</span> —{" "}
                      <span className="text-muted-foreground">{expo.place}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-2">
                  <a
                    href={`/contact?subject=Stall+Fabrication+for+${encodeURIComponent(expo.name)}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-warm text-xs font-semibold text-white shadow-glow hover:opacity-90 transition"
                  >
                    <span>Book Stall Fabrication</span>
                    <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* PAGINATION CONTROLS BAR (Shows when > 0 items, enables Prev/Next navigation) */}
        {filteredExpos.length > 0 && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
            <div className="text-xs text-muted-foreground">
              Showing{" "}
              <span className="font-bold text-white">
                {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredExpos.length)}
              </span>{" "}
              of <span className="font-bold text-white">{filteredExpos.length}</span> upcoming expos
            </div>

            {totalPages > 1 && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white hover:bg-white/10 transition cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={14} />
                  <span>Prev</span>
                </button>

                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => setCurrentPage(pageNum)}
                      className={`h-8 min-w-[32px] px-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                        currentPage === pageNum
                          ? "bg-gradient-warm text-white shadow-glow"
                          : "bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white hover:bg-white/10 transition cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed"
                >
                  <span>Next</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Bottom Banner */}
        <div className="mt-10 p-6 sm:p-8 rounded-3xl glass border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-display text-lg font-bold text-white">
              Participating in another trade show not listed here?
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              We fabricate custom booths and modular pavilions across all major exhibition centres in India.
            </p>
          </div>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition whitespace-nowrap border border-white/10"
          >
            <Sparkles size={14} className="text-brand-orange" />
            <span>Send Custom Stall Inquiry</span>
          </a>
        </div>
      </div>
    </section>
  );
};

