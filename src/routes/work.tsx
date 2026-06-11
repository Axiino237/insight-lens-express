import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { StallModel } from "@/components/StallModel";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import work5 from "@/assets/work-5.jpg";
import work6 from "@/assets/work-6.jpg";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Our Work — The First Step Solutions" },
      { name: "description", content: "Explore our portfolio of successfully delivered events, including brand activations, conferences, awards nights, festivals, weddings, and 3D exhibition stalls." },
      { name: "keywords", content: "event management portfolio, past events, brand activation case studies, event gallery, exhibition stall gallery, corporate event projects, event success stories, exhibition booth design models, live event photos, professional stage designs, past corporate summits, brand promotion gallery, creative event themes, event production showreel, local event execution examples, customised stall portfolio, exhibition fabrication examples" },
      { property: "og:title", content: "Our Work — The First Step Solutions" },
      { property: "og:description", content: "Check out our latest projects: activations, conferences, awards, festivals, weddings, and interactive 3D exhibition stalls." },
      { property: "og:url", content: "https://www.thefirststepsolutions.com/work" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://www.thefirststepsolutions.com/logo.png" },
      { property: "og:site_name", content: "The First Step Solutions" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Our Work — The First Step Solutions" },
      { name: "twitter:description", content: "Check out our latest projects: activations, conferences, awards, festivals, weddings, and interactive 3D exhibition stalls." },
      { name: "twitter:image", content: "https://www.thefirststepsolutions.com/logo.png" },
    ],
    links: [
      { rel: "canonical", href: "https://www.thefirststepsolutions.com/work" },
    ],
  }),
  component: () => (
    <Layout>
      <Work />
    </Layout>
  ),
});

const projects = [
  { img: work1, title: "Pixel Bloom Activation", tag: "Brand Activation", year: "2025", client: "Aurora Tech" },
  { img: work2, title: "Vision 2030 Summit", tag: "Conference", year: "2024", client: "Helix Group" },
  { img: work3, title: "Aurum Awards Night", tag: "Awards", year: "2024", client: "FICCI" },
  { img: work4, title: "Sonic Sunset Festival", tag: "Festival", year: "2025", client: "Spotify India" },
  { img: work5, title: "The Anaya Wedding", tag: "Wedding", year: "2024", client: "Private" },
  { img: work6, title: "Helix Product Launch", tag: "Product Launch", year: "2025", client: "Helix Mobility" },
];

function Work() {
  return (
    <>
      <section className="noise-bg">
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-28">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-magenta mb-4">Selected work</p>
          <h1 className="font-display text-5xl md:text-7xl font-extrabold leading-[0.95] max-w-5xl">
            <span className="text-gradient-warm">1,200+ events.</span><br />
            Here are a few favourites.
          </h1>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <article
              key={p.title}
              className={`group relative overflow-hidden rounded-3xl ${i % 3 === 0 ? "md:col-span-2" : ""}`}
            >
              <img
                src={p.img}
                alt={p.title}
                loading="lazy"
                className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-8 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <span className="text-xs uppercase tracking-widest text-brand-yellow">{p.tag}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3D MODEL SECTION */}
      <section className="py-24 border-t border-border/40 bg-gradient-to-b from-transparent to-card/10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-3xl mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-cyan mb-3">Interactive Exhibition Design</p>
            <h2 className="font-display text-4xl md:text-6xl font-extrabold leading-tight">
              Explore Our <span className="text-gradient-brand">Exhibition Stall in 3D</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-base md:text-lg leading-relaxed">
              We design and construct high-impact corporate, promotional, and brand exhibition stalls. 
              Interact with our custom-designed Polystone Compounds exhibition stall in real-time 3D space.
            </p>
          </div>

          <StallModel />
        </div>
      </section>
    </>
  );
}
