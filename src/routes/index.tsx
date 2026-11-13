import { useState, useEffect, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import {
  ArrowRight,
  Cuboid,
  Flame,
  Presentation,
  Network,
  Wine,
  Clapperboard,
  MonitorSmartphone,
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { ThreeDModel } from "@/components/ThreeDModel";
import { Counter } from "@/components/Counter";
import { ScrollBird } from "@/components/ScrollBird";
import { CurvedStallGallery } from "@/components/CurvedStallGallery";
import { StallHeroCarousel } from "@/components/StallHeroCarousel";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import heroEvent from "@/assets/hero-event.jpg";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import work5 from "@/assets/work-5.jpg";
import work6 from "@/assets/work-6.jpg";
import stallFabricationWork from "@/assets/stall-fabrication.jpg";
import video1 from "@/assets/videos/temp_cropped.webm";
import eppingerStall from "@/assets/eppinger-stall.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The First Step Solutions — #1 Event Management Company in Chennai" },
      {
        name: "description",
        content:
          "The First Step Solutions — Chennai's leading event management & brand experience agency. Corporate events, brand activations, MICE, weddings & exhibitions. 50+ events. 30+ brands. 4+ years. Call +91 44 3153 6968.",
      },
      {
        name: "keywords",
        content:
          "the first step solutions, first step solutions chennai, first step solutions event management, first step solutions brand activation, thefirststepsolutions.com, event management company chennai, top event management company in tamil nadu, best event company in chennai, brand activation agency india, corporate event organizers chennai, exhibition stall fabrication, wedding planners chennai, mice tour planners, digital events india, the first step solutions, event organizers in chennai, best event planners in tamil nadu, exhibition booth designers, corporate summit planners, branding agency chennai, product launch organizers, experiential marketing agency, top event management companies in chennai, live sound and light setup chennai, expo stall builders india, corporate annual day event planner, business meet coordinators, customised exhibition stalls, custom fabrication, customized event stalls, fabric exhibition stands, No.1 event company Chennai, first step solutions reviews",
      },
      {
        property: "og:title",
        content: "The First Step Solutions — #1 Event Management Company in Chennai",
      },
      {
        property: "og:description",
        content:
          "We turn ideas into experiences that move people and build brands. Chennai's premier event management and brand activation agency. 50+ events, 30+ brands.",
      },
      { property: "og:url", content: "https://www.thefirststepsolutions.com/" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://www.thefirststepsolutions.com/logo.png" },
      { property: "og:site_name", content: "The First Step Solutions" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@thefirststepsolutions" },
      {
        name: "twitter:title",
        content: "The First Step Solutions — #1 Event Management Company in Chennai",
      },
      {
        name: "twitter:description",
        content:
          "We turn ideas into experiences that move people and build brands. Premier brand experience agency in Chennai.",
      },
      { name: "twitter:image", content: "https://www.thefirststepsolutions.com/logo.png" },
    ],
    links: [{ rel: "canonical", href: "https://www.thefirststepsolutions.com/" }],
  }),
  component: () => (
    <Layout headerOverlay>
      <Home />
    </Layout>
  ),
});

const services = [
  {
    icon: Cuboid,
    title: "Stall Fabrication",
    desc: "Custom exhibition booths & trade show stalls designed and built for maximum engagement.",
  },
  {
    icon: Flame,
    title: "Brand Activation",
    desc: "Live, breathing experiences that turn audiences into advocates.",
  },
  {
    icon: Presentation,
    title: "Corporate Events",
    desc: "Conferences, summits & town-halls executed with cinematic precision.",
  },
  {
    icon: Network,
    title: "MICE & Conferences",
    desc: "End-to-end meetings, incentives & exhibitions across the globe.",
  },
  {
    icon: Wine,
    title: "Weddings & Celebrations",
    desc: "Once-in-a-lifetime moments, crafted with obsessive detail.",
  },
  {
    icon: Clapperboard,
    title: "Creative & Production",
    desc: "Concept, content, stage & screen — all under one roof.",
  },
  {
    icon: MonitorSmartphone,
    title: "Digital Solutions",
    desc: "Hybrid & virtual experiences that travel without borders.",
  },
];

const featuredProjects = [
  {
    img: stallFabricationWork,
    video: video1,
    title: "Polystone Expo Stall",
    tag: "Exhibition Stall Fabrication",
    badge: "★ Flagship Fabrication",
    desc: "Custom 3D exhibition architecture and interactive product display pavilion engineered for maximum visitor immersion and footfall.",
    accent: "from-brand-orange to-brand-magenta",
  },
  {
    img: work1,
    title: "Pixel Bloom Activation",
    tag: "Brand Activation",
    desc: "Multi-sensory pop-up installation & immersive audience engagement spectacle.",
    accent: "from-brand-cyan to-brand-blue",
  },
  {
    img: work2,
    title: "Vision 2030 Summit",
    tag: "Conference & Summit",
    desc: "High-level leadership convention with intelligent stagecraft & dynamic lighting.",
    accent: "from-brand-orange to-brand-magenta",
  },
  {
    img: work3,
    title: "Aurum Awards Night",
    tag: "Awards Gala",
    desc: "Prestigious gala dinner & recognition event with concert-grade audiovisuals.",
    accent: "from-brand-green to-brand-cyan",
  },
  {
    img: work5,
    title: "The Anaya Wedding",
    tag: "Luxury Wedding",
    desc: "Bespoke royal mandap architecture and curated celebratory guest experiences.",
    accent: "from-brand-magenta to-brand-blue",
  },
  {
    img: work4,
    title: "Sonic Sunset Festival",
    tag: "Music Festival",
    desc: "Outdoor live stage production, dynamic LED video walls & arena sound design.",
    accent: "from-brand-yellow to-brand-orange",
  },
  {
    img: work6,
    title: "Helix Product Launch",
    tag: "Product Launch",
    desc: "Futuristic reveal spectacle with synchronised lighting & hybrid live broadcast.",
    accent: "from-brand-blue to-brand-cyan",
  },
];

function useScrollReveal(threshold = 0.12, bottomOffset = 100) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else if (entry.boundingClientRect.top > 0) {
          setInView(false);
        }
      },
      {
        threshold,
        rootMargin: `0px 0px -${bottomOffset}px 0px`,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, bottomOffset]);

  return [ref, inView] as const;
}

function FeaturedWorkSection() {
  const [topRowRef, topInView] = useScrollReveal(0.12, 100);
  const [bottomRowRef, bottomInView] = useScrollReveal(0.12, 80);

  const heroProject = featuredProjects[0];
  const sideProjects = featuredProjects.slice(1, 3);
  const bottomProjects = featuredProjects.slice(3);

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-transparent via-card/30 to-transparent overflow-hidden">
      {/* Subtle ambient lighting behind grid */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[520px] bg-gradient-to-tr from-brand-orange/15 via-brand-magenta/10 to-transparent blur-[120px] opacity-70" />

      <div className="relative z-20 mx-auto max-w-7xl px-4">
        {/* Header */}
        <div
          id="featured-work-bird-zone"
          data-bird-zone="right"
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-brand-magenta mb-3">
              Featured work
            </p>
            <h2 className="font-display text-4xl md:text-6xl font-extrabold leading-tight max-w-3xl">
              Stories we've <span className="text-gradient-warm">brought to life.</span>
            </h2>
          </div>
          <Link
            id="featured-work-view-all"
            to="/work"
            className="inline-flex items-center gap-2 text-brand-cyan font-semibold hover:gap-3 transition-all"
          >
            View all projects <ArrowRight size={18} />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="space-y-5">
          {/* TOP ROW: Hero Stall + 2 Stacked Projects */}
          <div ref={topRowRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
            {/* HERO PROJECT: Stall Fabrication / Polystone Expo Stall */}
            <Link
              to="/work"
              style={{
                transitionDelay: topInView ? "0ms" : "0ms",
              }}
              className={`group relative md:col-span-2 lg:col-span-8 min-h-[460px] lg:min-h-[520px] rounded-3xl overflow-hidden border bg-[#0d0f17] flex flex-col justify-between p-7 sm:p-10 transition-all duration-700 ease-out hover:border-brand-orange/50 ${
                topInView
                  ? "opacity-100 translate-y-0 scale-100 shadow-[0_0_50px_-15px_rgba(255,90,122,0.25)] border-brand-orange/30"
                  : "opacity-20 translate-y-14 scale-[0.97] border-white/5"
              }`}
            >
              {/* Background Video / Image */}
              {heroProject.video ? (
                <video
                  src={heroProject.video}
                  poster={heroProject.img}
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="auto"
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              ) : (
                <img
                  src={heroProject.img}
                  alt={heroProject.title}
                  className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              )}

              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/35 group-hover:via-black/70 transition-colors duration-500" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-orange/25 via-transparent to-transparent opacity-80" />

              {/* Top Badges */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/20 border border-brand-orange/40 text-brand-orange text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-orange animate-pulse" />
                  {heroProject.badge}
                </div>
                <span className="text-xs uppercase tracking-widest text-white/80 font-medium bg-black/50 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
                  Exhibition Architecture
                </span>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 mt-auto pt-16">
                <span className="inline-block text-xs uppercase tracking-widest text-brand-orange font-semibold mb-2">
                  {heroProject.tag}
                </span>
                <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight group-hover:text-brand-orange transition-colors">
                  {heroProject.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
                  {heroProject.desc}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-orange group-hover:gap-3 transition-all">
                  <span>View Case Study</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </Link>

            {/* TWO STACKED TILES (Pixel Bloom & Vision 2030) */}
            <div className="md:col-span-2 lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-col gap-5">
              {sideProjects.map((p, idx) => {
                const delay = 180 * (idx + 1);
                return (
                  <Link
                    key={p.title}
                    to="/work"
                    style={{ transitionDelay: topInView ? `${delay}ms` : "0ms" }}
                    className={`group relative flex-1 min-h-[240px] rounded-3xl overflow-hidden border bg-[#0d0f17] flex flex-col justify-between p-6 sm:p-7 transition-all duration-700 ease-out hover:border-white/30 hover:-translate-y-1 ${
                      topInView
                        ? "opacity-100 translate-y-0 scale-100 border-white/10"
                        : "opacity-20 translate-y-14 scale-[0.97] border-white/5"
                    }`}
                  >
                    <img
                      src={p.img}
                      alt={p.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 to-black/35 group-hover:via-black/70 transition-colors duration-500" />
                    <div
                      className={`absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br ${p.accent} opacity-20 group-hover:opacity-40 blur-2xl transition duration-500`}
                    />

                    {/* Top */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="text-[11px] uppercase tracking-wider text-white/80 font-semibold bg-white/10 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-sm">
                        {p.tag}
                      </span>
                    </div>

                    {/* Bottom */}
                    <div className="relative z-10 mt-6">
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-brand-cyan transition-colors">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-gray-300 line-clamp-2 leading-relaxed">
                        {p.desc}
                      </p>
                      <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-cyan group-hover:gap-2.5 transition-all">
                        <span>Explore Project</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* BOTTOM ROW: 4 Gallery Tiles */}
          <div ref={bottomRowRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {bottomProjects.map((p, idx) => {
              const delay = 160 * idx;
              return (
                <Link
                  key={p.title}
                  to="/work"
                  style={{ transitionDelay: bottomInView ? `${delay}ms` : "0ms" }}
                  className={`group relative min-h-[260px] sm:min-h-[280px] rounded-3xl overflow-hidden border bg-[#0d0f17] flex flex-col justify-between p-6 transition-all duration-700 ease-out hover:border-white/30 hover:-translate-y-1 ${
                    bottomInView
                      ? "opacity-100 translate-y-0 scale-100 border-white/10"
                      : "opacity-20 translate-y-14 scale-[0.97] border-white/5"
                  }`}
                >
                  <img
                    src={p.img}
                    alt={p.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40 group-hover:via-black/70 transition-colors duration-500" />
                  <div
                    className={`absolute -top-10 -right-10 h-28 w-28 rounded-full bg-gradient-to-br ${p.accent} opacity-20 group-hover:opacity-40 blur-2xl transition duration-500`}
                  />

                  {/* Top */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wider text-white/80 font-semibold bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10 backdrop-blur-sm">
                      {p.tag}
                    </span>
                  </div>

                  {/* Bottom */}
                  <div className="relative z-10 mt-6">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-brand-orange transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-xs text-gray-300 line-clamp-2 leading-relaxed">
                      {p.desc}
                    </p>
                    <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-orange group-hover:gap-2 transition-all">
                      <span>View Project</span>
                      <ArrowRight size={13} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

import { BrandMarquee } from "@/components/BrandMarquee";

const orgSchema = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "EventVenue"],
  name: "The First Step Solutions",
  alternateName: ["First Step Solutions", "TFSS", "The First Step Solutions Chennai"],
  description:
    "Chennai's leading event management & brand experience agency specializing in corporate events, brand activations, MICE, weddings, and exhibition stall fabrication.",
  image: "https://www.thefirststepsolutions.com/logo.png",
  logo: "https://www.thefirststepsolutions.com/logo.png",
  "@id": "https://www.thefirststepsolutions.com/#organization",
  url: "https://www.thefirststepsolutions.com/",
  telephone: "+914431536968",
  email: "hello@thefirststepsolutions.co",
  priceRange: "$$",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, Bank Transfer, UPI",
  numberOfEmployees: { "@type": "QuantitativeValue", value: 20 },
  foundingDate: "2022",
  areaServed: [
    { "@type": "City", name: "Chennai" },
    { "@type": "City", name: "Mumbai" },
    { "@type": "State", name: "Tamil Nadu" },
    { "@type": "Country", name: "India" },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Flat No. 27, 1st Street, Kothari Nagar, Annai Sathya Nagar Main Road, Ramapuram",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    postalCode: "600089",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 13.0289,
    longitude: 80.1797,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:30",
    closes: "18:30",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "30",
  },
  sameAs: [
    "https://www.instagram.com/the_first_step_solutions/",
    "https://www.linkedin.com/company/the-first-step-solutions/",
    "https://www.youtube.com/@thefirststepsolutions",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "The First Step Solutions",
  url: "https://www.thefirststepsolutions.com/",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.thefirststepsolutions.com/?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Review",
  itemReviewed: {
    "@type": "ProfessionalService",
    name: "The First Step Solutions",
  },
  reviewRating: {
    "@type": "Rating",
    ratingValue: "5",
    bestRating: "5",
  },
  name: "Extraordinary brand experience",
  author: { "@type": "Person", name: "Elangovan" },
  reviewBody:
    "The First Step Solutions didn't just build our exhibition stall — they designed an extraordinary brand experience that became the absolute highlight of the venue. Their attention to detail drove massive footfall and engagement.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is The First Step Solutions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The First Step Solutions (TFSS) is Chennai's leading event management and brand experience agency, founded in 2022. We specialize in corporate events, brand activations, MICE, weddings, and custom exhibition stall fabrication across India and globally.",
      },
    },
    {
      "@type": "Question",
      name: "Where is The First Step Solutions located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our head office is in Chennai, Tamil Nadu, India (Ramapuram, Chennai 600089). We also operate from Mumbai and serve clients across 7 cities in 3 countries.",
      },
    },
    {
      "@type": "Question",
      name: "What services does The First Step Solutions offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer seven core services: Brand Activation, Corporate Events, MICE & Conferences, Weddings & Celebrations, Creative & Production, Stall Fabrication, and Digital & Hybrid Events. We also specialize in custom exhibition stall fabrication, 3D stall design, and product launches.",
      },
    },
    {
      "@type": "Question",
      name: "How do I contact The First Step Solutions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can reach us at +91 44 3153 6968, email hello@thefirststepsolutions.com, or visit our website at thefirststepsolutions.com. We respond to event briefs within 24 hours.",
      },
    },
    {
      "@type": "Question",
      name: "How many events has The First Step Solutions delivered?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The First Step Solutions has successfully delivered 50+ events across 7 cities and 3 countries, serving 30+ brands over 4+ years.",
      },
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.thefirststepsolutions.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Services",
      item: "https://www.thefirststepsolutions.com/services",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Work",
      item: "https://www.thefirststepsolutions.com/work",
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "About",
      item: "https://www.thefirststepsolutions.com/about",
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Contact",
      item: "https://www.thefirststepsolutions.com/contact",
    },
  ],
};

function EppingerSpotlightSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-x-clip overflow-y-visible">
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 overflow-visible">
        {/* THE CARD BOX CONTAINER - Sharp corners (no rounded corners), reduced height */}
        <div className="relative rounded-none noise-bg border border-white/10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9)] overflow-visible min-h-[290px] md:min-h-[310px] lg:min-h-[330px] flex items-center">
          
          {/* THE BACKGROUND FROM IMAGE 2 (Hero Section Background) - Sharp corners */}
          <div className="absolute inset-0 rounded-none overflow-hidden -z-10">
            <img
              src={heroEvent}
              alt="Live event stage with vibrant lighting"
              className="h-full w-full object-cover opacity-35"
            />
            {/* Split gradient overlay: Dark solid black on left for text, atmospheric glow on right */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/70" />
          </div>

          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-10">
            
            {/* LEFT SIDE: Clean text staying inside the box */}
            <div className="lg:col-span-5 z-20 flex flex-col justify-center">
              <p className="text-xs uppercase tracking-[0.25em] text-[#ff5a7a] font-semibold mb-2">
                Custom Exhibition Stall
              </p>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4">
                EPPINGER
              </h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl mb-5">
                Custom dual-corner exhibition pavilion engineered for Eppinger. Designed to deliver high-impact brand visibility through continuous overhead cantilever fascia, integrated downlighting, and ergonomic presentation counters for live B2B client meetings.
              </p>
              <Link
                to="/work"
                className="text-[#ff5a7a] hover:text-[#ff7a95] font-semibold text-base inline-flex items-center gap-1.5 transition-colors group/link w-fit"
              >
                <span>View More</span>
                <span className="transition-transform duration-300 group-hover/link:translate-x-1.5">→</span>
              </Link>
            </div>

            {/* RIGHT SIDE: Substantially larger Stall PNG exceeding the box, popping on hover, NO glow */}
            <div className="lg:col-span-7 relative z-30 flex items-center justify-center lg:justify-end">
              <div className="relative w-full lg:w-[145%] xl:w-[155%] lg:-mr-16 xl:-mr-24 lg:-my-18 xl:-my-24 cursor-pointer group">
                {/* Natural dark floor shadow underneath only - NO colored glow */}
                <div className="absolute inset-x-8 bottom-2 h-14 bg-black/90 blur-2xl pointer-events-none" />

                {/* The Stall PNG - larger size, exceeding the box, popping on hover with NO colored glow */}
                <img
                  src={eppingerStall}
                  alt="Eppinger Custom Exhibition Stall Fabrication"
                  className="w-full h-auto object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] group-hover:scale-106 group-hover:-translate-y-3 group-hover:drop-shadow-[0_30px_60px_rgba(0,0,0,0.95)] transition-all duration-500 ease-out"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

interface TestimonialItem {
  id: string;
  name: string;
  stars: number;
  companyName?: string;
  photo?: string;
  message: string;
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test_default_1",
    name: "Elangovan",
    stars: 5,
    companyName: "Revathi Equipment India Ltd.",
    photo: "",
    message:
      "The First Step Solutions didn't just build our exhibition stall — they designed an extraordinary brand experience that became the absolute highlight of the venue. Their attention to detail drove massive footfall and engagement.",
  },
];

function renderTestimonialMessage(msg: string) {
  const phrase = "extraordinary brand experience";
  if (msg.includes(phrase)) {
    const parts = msg.split(phrase);
    return (
      <>
        "{parts[0]}
        <span className="text-gradient-brand">{phrase}</span>
        {parts[1]}"
      </>
    );
  }
  return `"${msg}"`;
}

function Home() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(DEFAULT_TESTIMONIALS);
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const [isTestimonialHovered, setIsTestimonialHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
        }
      })
      .catch((err) => console.error("Error fetching testimonials", err));
  }, []);

  useEffect(() => {
    if (testimonials.length <= 1 || isTestimonialHovered) return;
    const timer = setInterval(() => {
      setActiveTestimonialIdx((prev) => (prev + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [testimonials.length, isTestimonialHovered]);

  const handlePrevTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNextTestimonial = () => {
    setActiveTestimonialIdx((prev) => (prev + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[activeTestimonialIdx] || DEFAULT_TESTIMONIALS[0];
  return (
    <>
      <SchemaMarkup schema={orgSchema} />
      <SchemaMarkup schema={websiteSchema} />
      <SchemaMarkup schema={reviewSchema} />
      <SchemaMarkup schema={faqSchema} />
      <SchemaMarkup schema={breadcrumbSchema} />
      <ScrollBird />
      {/* HERO */}
      <section className="relative noise-bg overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroEvent}
            alt="Live event stage with vibrant lighting"
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        </div>

        <div className="relative z-20 mx-auto max-w-7xl px-4 pt-20 pb-20 md:pt-28 md:pb-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-6">
                <span className="h-2 w-2 rounded-full bg-brand-magenta animate-pulse" />
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Est. 2022 · Chennai
                </span>
              </div>

              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] max-w-5xl">
                We turn <span className="text-gradient-warm">ideas</span>
                <br />
                into <span id="hero-experiences-anchor" className="text-gradient-brand">experiences</span>
                <br />
                that <span className="text-brand-cyan">move people.</span>
              </h1>

              <p className="mt-8 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
                The First Step Solutions is a premier brand experience & event company with a global
                footprint. From local activations to massive worldwide spectacles, we design,
                produce, and execute seamless events anywhere across the globe.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-warm px-7 py-4 text-base font-semibold text-white shadow-glow hover:opacity-90 transition"
                >
                  Plan Your Event
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
                </Link>
                <Link
                  to="/work"
                  className="inline-flex items-center gap-2 rounded-full glass px-7 py-4 text-base font-semibold hover:bg-white/10 transition"
                >
                  See Our Work
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center items-center lg:self-start lg:pt-2">
              <ThreeDModel />
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl">
            {[
              { value: 4, suffix: "+", l: "Years of magic" },
              { value: 120, suffix: "+", l: "Stalls delivered" },
              { value: 30, suffix: "+", l: "Events delivered" },
              { value: 11, suffix: "+", l: "Cities, 3 countries" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-2xl p-5">
                <div className="font-display text-3xl md:text-4xl font-bold text-gradient-brand">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STALL HERO CAROUSEL (BELOW COVER) */}
      <StallHeroCarousel />

      {/* CURVED STALL SHOWCASE (STALL SCROLL) */}
      <CurvedStallGallery />

      {/* CLIENTS MARQUEE (BRAND SCROLL) */}
      <section className="py-12 border-y border-border/40 overflow-hidden">
        <p className="text-center text-xs uppercase tracking-[0.4em] text-muted-foreground mb-8">
          Trusted by industry leaders
        </p>
        <BrandMarquee />
      </section>

      {/* EPPINGER STALL SPOTLIGHT (PNG BOX) */}
      <EppingerSpotlightSection />

      {/* FEATURED WORK: BENTO GRID WITH HERO STALL */}
      <FeaturedWorkSection />

      {/* SERVICES */}
      <section className="relative py-24 md:py-32">
        <div className="relative z-20 mx-auto max-w-7xl px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-brand-cyan mb-3">What we do</p>
              <h2 className="font-display text-4xl md:text-6xl font-extrabold leading-tight max-w-3xl">
                Seven disciplines.
                <br />
                <span className="text-gradient-brand">One creative powerhouse.</span>
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-brand-orange font-semibold hover:gap-3 transition-all"
            >
              All services <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const Icon = s.icon;
              const accent = [
                "from-brand-orange to-brand-magenta",
                "from-brand-cyan to-brand-blue",
                "from-brand-green to-brand-cyan",
                "from-brand-magenta to-brand-blue",
                "from-brand-yellow to-brand-orange",
                "from-brand-blue to-brand-magenta",
                "from-brand-cyan to-brand-green",
              ][i % 7];
              return (
                <div
                  key={s.title}
                  className={`group relative glass rounded-3xl p-8 hover:bg-white/10 transition overflow-hidden ${i === 0 ? "md:col-span-2 lg:col-span-3" : ""}`}
                >
                  <div
                    className={`absolute -top-20 -right-20 h-44 w-44 rounded-full bg-gradient-to-br ${accent} opacity-20 group-hover:opacity-40 blur-3xl transition`}
                  />
                  <div className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.05] border border-white/15 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-white/30 group-hover:shadow-[0_0_25px_rgba(255,255,255,0.12)]">
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${accent} opacity-25 blur-md group-hover:opacity-60 transition-opacity duration-300`}
                    />
                    <Icon size={26} className="relative z-10 text-white transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <h3 className="relative font-display text-2xl font-bold mt-6">{s.title}</h3>
                  <p className="relative mt-3 text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL SPOTLIGHT (OPTION 3: GLASS SPOTLIGHT + CLIENT PILLS) */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Subtle Ambient Radial Glows */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 h-72 w-72 rounded-full bg-brand-orange/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 h-72 w-72 rounded-full bg-brand-cyan/10 blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-4xl px-4 relative z-10">
          {/* Eyebrow Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-bold tracking-widest uppercase shadow-sm">
              <Sparkles size={13} />
              Client Stories & Reviews
            </div>
          </div>

          {/* Frosted Glass Spotlight Card */}
          <div
            onMouseEnter={() => setIsTestimonialHovered(true)}
            onMouseLeave={() => setIsTestimonialHovered(false)}
            onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchStartX === null || testimonials.length <= 1) return;
              const diff = touchStartX - e.changedTouches[0].clientX;
              if (Math.abs(diff) > 40) {
                if (diff > 0) handleNextTestimonial();
                else handlePrevTestimonial();
              }
              setTouchStartX(null);
            }}
            className="relative glass rounded-3xl p-6 sm:p-10 md:p-12 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.55)] overflow-hidden transition-all duration-300"
          >
            {/* Decorative Watermark Quote */}
            <Quote
              size={110}
              className="absolute -top-3 -left-3 text-white/[0.03] pointer-events-none rotate-12"
            />
            <Quote
              size={90}
              className="absolute -bottom-4 -right-3 text-brand-orange/[0.04] pointer-events-none rotate-180"
            />

            {/* Top Meta Row: Stars + Nav Controls */}
            <div className="flex items-center justify-between gap-4 mb-6 relative z-10">
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10">
                <div className="flex items-center gap-0.5">
                  {[...Array(currentTestimonial.stars || 5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-brand-yellow text-brand-yellow" />
                  ))}
                </div>
                <span className="h-3 w-px bg-white/15" />
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                  <CheckCircle2 size={12} />
                  Verified Client
                </span>
              </div>

              {testimonials.length > 1 && (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handlePrevTestimonial}
                    aria-label="Previous testimonial"
                    className="h-9 w-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-gray-300 hover:text-white flex items-center justify-center transition cursor-pointer active:scale-95"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextTestimonial}
                    aria-label="Next testimonial"
                    className="h-9 w-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-gray-300 hover:text-white flex items-center justify-center transition cursor-pointer active:scale-95"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Active Quote Message */}
            <blockquote className="relative z-10 text-center sm:text-left font-display text-lg sm:text-xl md:text-2xl font-medium md:font-semibold leading-relaxed text-gray-100 min-h-[96px] flex items-center">
              <p className="w-full">{renderTestimonialMessage(currentTestimonial.message)}</p>
            </blockquote>

            {/* Active Client Author Row */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
              <div className="inline-flex items-center gap-3.5 mx-auto sm:mx-0">
                {currentTestimonial.photo ? (
                  <img
                    src={currentTestimonial.photo}
                    alt={currentTestimonial.name}
                    className="h-12 w-12 rounded-full object-cover border-2 border-brand-orange/40 shadow-md"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-gradient-warm flex items-center justify-center font-bold text-white text-base shadow-glow">
                    {currentTestimonial.name ? currentTestimonial.name.charAt(0).toUpperCase() : "E"}
                  </div>
                )}
                <div className="text-left">
                  <div className="font-display font-bold text-base text-white">
                    {currentTestimonial.name}
                  </div>
                  {currentTestimonial.companyName && (
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      {currentTestimonial.companyName}
                    </div>
                  )}
                </div>
              </div>

              {testimonials.length > 1 && (
                <div className="text-[11px] font-medium text-muted-foreground text-center sm:text-right">
                  {activeTestimonialIdx + 1} / {testimonials.length} Reviews
                </div>
              )}
            </div>
          </div>

          {/* Interactive Client Selector Pills */}
          {testimonials.length > 1 && (
            <div className="mt-6 flex flex-wrap justify-center items-center gap-2">
              {testimonials.map((t, idx) => {
                const isActive = idx === activeTestimonialIdx;
                return (
                  <button
                    key={t.id || idx}
                    type="button"
                    onClick={() => setActiveTestimonialIdx(idx)}
                    className={`inline-flex items-center gap-2 pl-1.5 pr-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer border ${
                      isActive
                        ? "bg-gradient-warm text-white border-transparent shadow-glow scale-[1.03]"
                        : "bg-white/[0.04] hover:bg-white/[0.09] text-gray-300 hover:text-white border-white/10"
                    }`}
                    aria-label={`Read testimonial from ${t.name}`}
                  >
                    {t.photo ? (
                      <img
                        src={t.photo}
                        alt={t.name}
                        className="h-6 w-6 rounded-full object-cover border border-white/20"
                      />
                    ) : (
                      <span
                        className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-white/10 text-gray-300"
                        }`}
                      >
                        {t.name ? t.name.charAt(0).toUpperCase() : "C"}
                      </span>
                    )}
                    <span className="max-w-[130px] truncate">{t.name}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative mx-auto max-w-7xl px-4 pb-24">
        <div className="relative overflow-hidden rounded-3xl p-10 md:p-20 bg-gradient-brand">
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 max-w-3xl">
            <h2 className="font-display text-4xl md:text-6xl font-extrabold leading-tight text-white">
              Let's build the next unforgettable thing — together.
            </h2>
            <p className="mt-5 text-white/90 text-lg max-w-xl">
              Drop your brief. Our creative producers will reply within 24 hours.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-background px-8 py-4 text-base font-semibold text-foreground hover:bg-background/90 transition"
            >
              Start a Project <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
