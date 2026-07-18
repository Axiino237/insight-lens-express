import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { ArrowRight, Sparkles, Megaphone, Calendar, Camera, Lightbulb, Globe2, Star, Hammer } from "lucide-react";
import { ThreeDModel } from "@/components/ThreeDModel";
import { SchemaMarkup } from "@/components/SchemaMarkup";
import heroEvent from "@/assets/hero-event.jpg";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import work5 from "@/assets/work-5.jpg";
import work6 from "@/assets/work-6.jpg";
import stallFabricationWork from "@/assets/stall-fabrication.jpg";
import video1 from "@/assets/videos/DJI_20260701175410_0161_D.webm";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The First Step Solutions — #1 Event Management Company in Chennai" },
      { name: "description", content: "The First Step Solutions — Chennai's leading event management & brand experience agency. Corporate events, brand activations, MICE, weddings & exhibitions. 50+ events. 30+ brands. 4+ years. Call +91 44 3153 6968." },
      { name: "keywords", content: "the first step solutions, first step solutions chennai, first step solutions event management, first step solutions brand activation, thefirststepsolutions.com, event management company chennai, top event management company in tamil nadu, best event company in chennai, brand activation agency india, corporate event organizers chennai, exhibition stall fabrication, wedding planners chennai, mice tour planners, digital events india, the first step solutions, event organizers in chennai, best event planners in tamil nadu, exhibition booth designers, corporate summit planners, branding agency chennai, product launch organizers, experiential marketing agency, top event management companies in chennai, live sound and light setup chennai, expo stall builders india, corporate annual day event planner, business meet coordinators, customised exhibition stalls, custom fabrication, customized event stalls, fabric exhibition stands, No.1 event company Chennai, first step solutions reviews" },
      { property: "og:title", content: "The First Step Solutions — #1 Event Management Company in Chennai" },
      { property: "og:description", content: "We turn ideas into experiences that move people and build brands. Chennai's premier event management and brand activation agency. 50+ events, 30+ brands." },
      { property: "og:url", content: "https://www.thefirststepsolutions.com/" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://www.thefirststepsolutions.com/logo.png" },
      { property: "og:site_name", content: "The First Step Solutions" },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@thefirststepsolutions" },
      { name: "twitter:title", content: "The First Step Solutions — #1 Event Management Company in Chennai" },
      { name: "twitter:description", content: "We turn ideas into experiences that move people and build brands. Premier brand experience agency in Chennai." },
      { name: "twitter:image", content: "https://www.thefirststepsolutions.com/logo.png" },
    ],
    links: [
      { rel: "canonical", href: "https://www.thefirststepsolutions.com/" },
    ],
  }),
  component: () => (
    <Layout>
      <Home />
    </Layout>
  ),
});

const services = [
  { icon: Hammer, title: "Stall Fabrication", desc: "Custom exhibition booths & trade show stalls designed and built for maximum engagement." },
  { icon: Megaphone, title: "Brand Activation", desc: "Live, breathing experiences that turn audiences into advocates." },
  { icon: Calendar, title: "Corporate Events", desc: "Conferences, summits & town-halls executed with cinematic precision." },
  { icon: Sparkles, title: "MICE & Conferences", desc: "End-to-end meetings, incentives & exhibitions across the globe." },
  { icon: Camera, title: "Weddings & Celebrations", desc: "Once-in-a-lifetime moments, crafted with obsessive detail." },
  { icon: Lightbulb, title: "Creative & Production", desc: "Concept, content, stage & screen — all under one roof." },
  { icon: Globe2, title: "Digital Solutions", desc: "Hybrid & virtual experiences that travel without borders." },
];

const projects = [
  { img: stallFabricationWork, video: video1, title: "Polystone Expo Stall", tag: "Stall Fabrication" },
  { img: work1, title: "Pixel Bloom Activation", tag: "Brand Activation" },
  { img: work2, title: "Vision 2030 Summit", tag: "Conference" },
  { img: work3, title: "Aurum Awards Night", tag: "Awards" },
  { img: work4, title: "Sonic Sunset Festival", tag: "Festival" },
  { img: work5, title: "The Anaya Wedding", tag: "Wedding" },
  { img: work6, title: "Helix Product Launch", tag: "Product Launch" },
];

const clients = ["REL", "AQUA CLEAN", "CONCEPTION SOFTWARE TECHNOLOGY", "CM TECHNO", "MEKARK", "ORG ENGITECH", "JETPRO", "MAXIO INDUSTRIES PVT. LTD."];

const orgSchema = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "EventVenue"],
  "name": "The First Step Solutions",
  "alternateName": ["First Step Solutions", "TFSS", "The First Step Solutions Chennai"],
  "description": "Chennai's leading event management & brand experience agency specializing in corporate events, brand activations, MICE, weddings, and exhibition stall fabrication.",
  "image": "https://www.thefirststepsolutions.com/logo.png",
  "logo": "https://www.thefirststepsolutions.com/logo.png",
  "@id": "https://www.thefirststepsolutions.com/#organization",
  "url": "https://www.thefirststepsolutions.com/",
  "telephone": "+914431536968",
  "email": "hello@thefirststepsolutions.co",
  "priceRange": "$$",
  "currenciesAccepted": "INR",
  "paymentAccepted": "Cash, Bank Transfer, UPI",
  "numberOfEmployees": { "@type": "QuantitativeValue", "value": 20 },
  "foundingDate": "2022",
  "areaServed": [
    { "@type": "City", "name": "Chennai" },
    { "@type": "City", "name": "Mumbai" },
    { "@type": "State", "name": "Tamil Nadu" },
    { "@type": "Country", "name": "India" }
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Flat No. 27, 1st Street, Kothari Nagar, Annai Sathya Nagar Main Road, Ramapuram",
    "addressLocality": "Chennai",
    "addressRegion": "Tamil Nadu",
    "postalCode": "600089",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 13.0289,
    "longitude": 80.1797
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "09:30",
    "closes": "18:30"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "30"
  },
  "sameAs": [
    "https://www.instagram.com/the_first_step_solutions/",
    "https://www.linkedin.com/company/the-first-step-solutions/",
    "https://www.youtube.com/@thefirststepsolutions"
  ]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "The First Step Solutions",
  "url": "https://www.thefirststepsolutions.com/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.thefirststepsolutions.com/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@type": "ProfessionalService",
    "name": "The First Step Solutions"
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5",
    "bestRating": "5"
  },
  "name": "Extraordinary brand experience",
  "author": { "@type": "Person", "name": "Elangovan" },
  "reviewBody": "The First Step Solutions didn't just build our exhibition stall — they designed an extraordinary brand experience that became the absolute highlight of the venue. Their attention to detail drove massive footfall and engagement."
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is The First Step Solutions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The First Step Solutions (TFSS) is Chennai's leading event management and brand experience agency, founded in 2022. We specialize in corporate events, brand activations, MICE, weddings, and custom exhibition stall fabrication across India and globally."
      }
    },
    {
      "@type": "Question",
      "name": "Where is The First Step Solutions located?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our head office is in Chennai, Tamil Nadu, India (Ramapuram, Chennai 600089). We also operate from Mumbai and serve clients across 7 cities in 3 countries."
      }
    },
    {
      "@type": "Question",
      "name": "What services does The First Step Solutions offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer seven core services: Brand Activation, Corporate Events, MICE & Conferences, Weddings & Celebrations, Creative & Production, Stall Fabrication, and Digital & Hybrid Events. We also specialize in custom exhibition stall fabrication, 3D stall design, and product launches."
      }
    },
    {
      "@type": "Question",
      "name": "How do I contact The First Step Solutions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can reach us at +91 44 3153 6968, email hello@thefirststepsolutions.com, or visit our website at thefirststepsolutions.com. We respond to event briefs within 24 hours."
      }
    },
    {
      "@type": "Question",
      "name": "How many events has The First Step Solutions delivered?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The First Step Solutions has successfully delivered 50+ events across 7 cities and 3 countries, serving 30+ brands over 4+ years."
      }
    }
  ]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.thefirststepsolutions.com/" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://www.thefirststepsolutions.com/services" },
    { "@type": "ListItem", "position": 3, "name": "Work", "item": "https://www.thefirststepsolutions.com/work" },
    { "@type": "ListItem", "position": 4, "name": "About", "item": "https://www.thefirststepsolutions.com/about" },
    { "@type": "ListItem", "position": 5, "name": "Contact", "item": "https://www.thefirststepsolutions.com/contact" }
  ]
};

function Home() {
  return (
    <>
      <SchemaMarkup schema={orgSchema} />
      <SchemaMarkup schema={websiteSchema} />
      <SchemaMarkup schema={reviewSchema} />
      <SchemaMarkup schema={faqSchema} />
      <SchemaMarkup schema={breadcrumbSchema} />
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

        <div className="relative mx-auto max-w-7xl px-4 py-24 md:py-36">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-8">
                <span className="h-2 w-2 rounded-full bg-brand-magenta animate-pulse" />
                <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Est. 2022 · Chennai
                </span>
              </div>

              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] max-w-5xl">
                We turn <span className="text-gradient-warm">ideas</span>
                <br />
                into <span className="text-gradient-brand">experiences</span>
                <br />
                that <span className="text-brand-cyan">move people.</span>
              </h1>

              <p className="mt-8 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
                The First Step Solutions is a premier brand experience & event company with a global footprint.
                From local activations to massive worldwide spectacles, we design,
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

            <div className="lg:col-span-5 flex justify-center items-center">
              <ThreeDModel />
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl">
            {[
              { n: "4+", l: "Years of magic" },
              { n: "50+", l: "Events delivered" },
              { n: "30+", l: "Brands served" },
              { n: "7", l: "Cities, 3 countries" },
            ].map((s) => (
              <div key={s.l} className="glass rounded-2xl p-5">
                <div className="font-display text-3xl md:text-4xl font-bold text-gradient-brand">{s.n}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENTS MARQUEE */}
      <section className="py-12 border-y border-border/40 overflow-hidden">
        <p className="text-center text-xs uppercase tracking-[0.4em] text-muted-foreground mb-6">
          Trusted by industry leaders
        </p>
        <div className="flex marquee gap-16 whitespace-nowrap">
          {[...clients, ...clients].map((c, i) => (
            <span key={i} className="font-display text-2xl md:text-3xl font-bold text-muted-foreground/60 hover:text-foreground transition">
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-brand-cyan mb-3">What we do</p>
              <h2 className="font-display text-4xl md:text-6xl font-extrabold leading-tight max-w-3xl">
                Seven disciplines.<br />
                <span className="text-gradient-brand">One creative powerhouse.</span>
              </h2>
            </div>
            <Link to="/services" className="inline-flex items-center gap-2 text-brand-orange font-semibold hover:gap-3 transition-all">
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
                <div key={s.title} className={`group relative glass rounded-3xl p-8 hover:bg-white/10 transition overflow-hidden ${i === 0 ? "md:col-span-2 lg:col-span-3" : ""}`}>
                  <div className={`absolute -top-20 -right-20 h-44 w-44 rounded-full bg-gradient-to-br ${accent} opacity-20 group-hover:opacity-40 blur-3xl transition`} />
                  <div className={`relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-white shadow-glow`}>
                    <Icon size={26} />
                  </div>
                  <h3 className="relative font-display text-2xl font-bold mt-6">{s.title}</h3>
                  <p className="relative mt-3 text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-transparent via-card/30 to-transparent">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-brand-magenta mb-3">Featured work</p>
              <h2 className="font-display text-4xl md:text-6xl font-extrabold leading-tight max-w-3xl">
                Stories we've <span className="text-gradient-warm">brought to life.</span>
              </h2>
            </div>
            <Link to="/work" className="inline-flex items-center gap-2 text-brand-cyan font-semibold hover:gap-3 transition-all">
              View all projects <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <div
                key={p.title}
                className={`group relative overflow-hidden rounded-3xl ${i === 0 ? "lg:col-span-2 lg:row-span-2" : i === 6 ? "lg:col-span-3" : ""}`}
              >
                {p.video ? (
                  <video
                    src={p.video}
                    poster={p.img}
                    muted
                    autoPlay
                    loop
                    playsInline
                    onPlay={(e) => {
                      e.currentTarget.playbackRate = 1.75;
                    }}
                    onLoadedMetadata={(e) => {
                      e.currentTarget.playbackRate = 1.75;
                    }}
                    onTimeUpdate={(e) => {
                      e.currentTarget.playbackRate = 1.75;
                      if (e.currentTarget.currentTime >= 30) {
                        e.currentTarget.currentTime = 0;
                      }
                    }}
                    className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${i === 0 ? "h-[400px] lg:h-full" : i === 6 ? "h-72 lg:h-[350px]" : "h-72"}`}
                  />
                ) : (
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${i === 0 ? "h-[400px] lg:h-full" : i === 6 ? "h-72 lg:h-[350px]" : "h-72"}`}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block text-xs uppercase tracking-widest text-brand-yellow mb-2">{p.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="relative py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} className="fill-brand-yellow text-brand-yellow" />
            ))}
          </div>
          <p className="font-display text-2xl md:text-4xl font-semibold leading-tight">
            "The First Step Solutions didn't just build our exhibition stall — they designed an
            <span className="text-gradient-brand">extraordinary brand experience</span> that became the absolute highlight
            of the venue. Their attention to detail drove massive footfall and engagement."
          </p>
          <div className="mt-8 inline-flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-warm" />
            <div className="text-left">
              <div className="font-semibold">Elangovan</div>
              <div className="text-sm text-muted-foreground">Revathi Equipment India Ltd.</div>
            </div>
          </div>
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
