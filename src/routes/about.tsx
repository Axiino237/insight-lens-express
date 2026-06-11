import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About The First Step Solutions — Chennai's Premier Event Agency" },
      { name: "description", content: "About The First Step Solutions — Chennai's top event management and brand experience agency. Founded 2022, we've grown to a team of producers, designers & technologists delivering 50+ events across 7 cities & 3 countries." },
      { name: "keywords", content: "about the first step solutions, first step solutions team, first step solutions history, the first step solutions chennai, event production agency, brand activation team, corporate event planners, event execution team chennai, global event managers, event management team profiles, professional event coordinators, creative directors events, event fabrication experts, experiential design agency, top event experts india, event operation logistics, experienced event managers chennai, first step solutions founded 2022" },
      { property: "og:title", content: "About The First Step Solutions — Chennai's Premier Event Agency" },
      { property: "og:description", content: "Learn about our philosophy: Ideas. Innovation. Impact. Premier brand experience agency with global footprint. Est. 2022, Chennai." },
      { property: "og:url", content: "https://www.thefirststepsolutions.com/about" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://www.thefirststepsolutions.com/logo.png" },
      { property: "og:site_name", content: "The First Step Solutions" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "About — The First Step Solutions" },
      { name: "twitter:description", content: "Learn about our philosophy: Ideas. Innovation. Impact. Premier brand experience agency with global footprint." },
      { name: "twitter:image", content: "https://www.thefirststepsolutions.com/logo.png" },
    ],
    links: [
      { rel: "canonical", href: "https://www.thefirststepsolutions.com/about" },
    ],
  }),
  component: () => (
    <Layout>
      <About />
    </Layout>
  ),
});

const values = [
  { n: "01", t: "Ideas first", d: "Strategy and story drive every prop, pixel and pyrotechnic." },
  { n: "02", t: "Innovate relentlessly", d: "We pressure-test every format. If it bores us, it goes." },
  { n: "03", t: "Impact, measured", d: "Footfall, sentiment, sales lift — we ship outcomes, not optics." },
  { n: "04", t: "Hospitality is everything", d: "Your guest's first 30 seconds is our 30-day obsession." },
];

function About() {
  return (
    <>
      <section className="relative noise-bg">
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-28">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-cyan mb-4">About us</p>
          <h1 className="font-display text-5xl md:text-7xl font-extrabold leading-[0.95] max-w-5xl">
            A creative collective<br />
            obsessed with <span className="text-gradient-brand">the live moment.</span>
          </h1>
          <p className="mt-8 max-w-3xl text-lg text-muted-foreground leading-relaxed">
            The First Step Solutions is a premier brand experience and event agency with a global reach.
            Since our inception, we have grown into a diverse team of producers,
            designers, technologists, and dreamers — building unforgettable moments
            and executing seamless activations worldwide.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 border-y border-border/40">
        <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-brand-magenta mb-3">Our philosophy</p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold leading-tight">
              Ideas. <span className="text-gradient-warm">Innovation.</span><br />Impact.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Three words. One creed. Every brief begins with the right idea,
              gets re-imagined through new tech and craft, and is judged only
              by the impact it leaves behind.
            </p>
          </div>
          <div className="grid gap-5">
            {values.map((v) => (
              <div key={v.n} className="glass rounded-2xl p-6 flex gap-5">
                <div className="font-display text-3xl font-bold text-gradient-brand shrink-0 w-14">{v.n}</div>
                <div>
                  <h3 className="font-display text-xl font-bold">{v.t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{v.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="font-display text-3xl md:text-5xl font-extrabold mb-10">
            Where you'll find us.
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["Chennai HQ", "Mumbai"].map((c) => (
              <span key={c} className="glass rounded-full px-6 py-3 text-sm font-medium">
                {c}
              </span>
            ))}
          </div>
          <Link
            to="/contact"
            className="mt-12 inline-flex items-center gap-2 rounded-full bg-gradient-warm px-7 py-4 font-semibold text-white shadow-glow"
          >
            Work with us <ArrowRight size={18} />
          </Link>
          <p className="mt-6 text-base md:text-lg font-bold uppercase tracking-[0.25em] text-gradient-warm">
            Worldwide Service & Global Execution
          </p>
        </div>
      </section>
    </>
  );
}
