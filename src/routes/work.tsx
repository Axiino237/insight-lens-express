import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { StallModel } from "@/components/StallModel";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import work5 from "@/assets/work-5.jpg";
import work6 from "@/assets/work-6.jpg";
import stallFabricationWork from "@/assets/stall-fabrication.jpg";
import video1 from "@/assets/videos/temp_cropped.webm";
import stall1 from "@/assets/stall/IMG-20240419-WA0082.jpg";
import stall2 from "@/assets/stall/IMG-20240419-WA0083.jpg";
import stall3 from "@/assets/stall/IMG-20240419-WA0088.jpg";
import stall4 from "@/assets/stall/IMG-20240419-WA0108.jpg";
import stall5 from "@/assets/stall/IMG-20250702-WA0053.jpg";
import stall6 from "@/assets/stall/IMG-20250702-WA0054.jpg";
import stall7 from "@/assets/stall/Screenshot_20250704_220106.jpg";
import stall8 from "@/assets/stall/Screenshot_20250704_220131.jpg";
import stall9 from "@/assets/stall/Screenshot_20250704_222302.jpg";
import stall10 from "@/assets/stall/Screenshot_20250704_223741.jpg";
import stall11 from "@/assets/stall/Screenshot_20250704_223749.jpg";
import stall12 from "@/assets/stall/Screenshot_20250704_223758.jpg";
import stall13 from "@/assets/stall/Screenshot_20250704_224515.jpg";
import stall14 from "@/assets/stall/Screenshot_20250704_224556.jpg";

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
  { img: stallFabricationWork, video: video1, title: "Polystone Expo Stall", tag: "Stall Fabrication", year: "2024", client: "Polystone Compounds" },
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
        <div className="mx-auto max-w-7xl px-4 pt-6 pb-16 md:pt-10 md:pb-24">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-magenta mb-6">Selected work</p>
          <h1 className="font-display text-5xl md:text-7xl font-extrabold leading-[0.95] max-w-5xl">
            <span className="text-gradient-warm">1,200+ events.</span><br />
            Here are a few favourites.
          </h1>
        </div>
      </section>

      <section className="pt-10 pb-32 md:pt-14 md:pb-40">
        <div className="mx-auto max-w-7xl px-4 grid gap-10 md:gap-14 md:grid-cols-2">
          {projects.map((p, i) => (
            <article
              key={p.title}
              className={`group relative overflow-hidden rounded-3xl ${i % 3 === 0 ? "md:col-span-2" : ""}`}
            >
              {p.video ? (
                <video
                  src={p.video}
                  poster={p.img}
                  muted
                  autoPlay
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-[420px] md:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
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

      {/* STALL FABRICATION HORIZONTAL SCROLL GALLERY */}
      <section className="py-28 md:py-36 border-y border-border/40 overflow-hidden relative bg-gradient-to-b from-transparent via-card/10 to-transparent">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-3xl mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-magenta mb-4">Our Fabrication Craft</p>
            <h2 className="font-display text-4xl md:text-6xl font-extrabold leading-tight">
              Exhibition Stalls <span className="text-gradient-warm">Brought to Life</span>
            </h2>
            <p className="mt-6 text-muted-foreground text-base md:text-lg leading-relaxed">
              Take a look at some of the custom-built exhibition stands and brand showcase booths we have designed and fabricated. Hover to pause the scrolling.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-black/40 py-8">
            {/* Ambient horizontal gradients */}
            <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            <div className="overflow-hidden w-full relative">
              <div className="flex gap-6 animate-marquee-left hover-pause cursor-pointer">
                {[
                  stall1, stall2, stall3, stall4, stall5, stall6, stall7,
                  stall8, stall9, stall10, stall11, stall12, stall13, stall14
                ].map((img, idx) => (
                  <div key={`row-${idx}`} className="flex-shrink-0 w-72 md:w-96 overflow-hidden rounded-2xl border border-white/5 shadow-card group/img">
                    <img
                      src={img}
                      alt="Exhibition Stall Design"
                      loading="lazy"
                      className="w-full h-48 md:h-64 object-cover transition-transform duration-500 group-hover/img:scale-110"
                    />
                  </div>
                ))}
                {/* Duplicate for infinite loop */}
                {[
                  stall1, stall2, stall3, stall4, stall5, stall6, stall7,
                  stall8, stall9, stall10, stall11, stall12, stall13, stall14
                ].map((img, idx) => (
                  <div key={`row-dup-${idx}`} className="flex-shrink-0 w-72 md:w-96 overflow-hidden rounded-2xl border border-white/5 shadow-card group/img">
                    <img
                      src={img}
                      alt="Exhibition Stall Design"
                      loading="lazy"
                      className="w-full h-48 md:h-64 object-cover transition-transform duration-500 group-hover/img:scale-110"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 3D MODEL SECTION */}
      <section className="py-28 md:py-36 border-t border-border/40 bg-gradient-to-b from-transparent to-card/10">
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
