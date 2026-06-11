import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { ArrowRight, Megaphone, Calendar, Sparkles, Camera, Lightbulb, Globe2 } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — The First Step Solutions | Event Management Chennai" },
      { name: "description", content: "The First Step Solutions offers premium event services in Chennai: Brand Activation, Corporate Events, MICE, Weddings, Creative Production & Digital/Hybrid solutions. India's full-service event agency." },
      { name: "keywords", content: "the first step solutions services, first step solutions event services chennai, brand activation agency chennai, corporate events management, MICE tour organizers, exhibition stall construction, wedding planning services, product launch event, digital hybrid events, bespoke wedding decorators, corporate conference planners, brand experiential popups, interactive virtual events, event stage design, sound and lighting rental for events, mall activation organizers, stall fabricator in mumbai, stall fabricator in bengaluru, corporate rewards and recognition organizers, custom trade show booths, customised stall design, exhibition fabrication, event fabrics and printing, custom stall setup" },
      { property: "og:title", content: "Services — The First Step Solutions | Event Management Chennai" },
      { property: "og:description", content: "Six disciplines, one creative powerhouse. Brand activation, corporate events, MICE, weddings, and digital experiences." },
      { property: "og:url", content: "https://www.thefirststepsolutions.com/services" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://www.thefirststepsolutions.com/logo.png" },
      { property: "og:site_name", content: "The First Step Solutions" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Services — The First Step Solutions" },
      { name: "twitter:description", content: "Six disciplines, one creative powerhouse. Brand activation, corporate events, MICE, weddings, and digital experiences." },
      { name: "twitter:image", content: "https://www.thefirststepsolutions.com/logo.png" },
    ],
    links: [
      { rel: "canonical", href: "https://www.thefirststepsolutions.com/services" },
    ],
  }),
  component: () => (
    <Layout>
      <Services />
    </Layout>
  ),
});

const services = [
  { icon: Megaphone, title: "Brand Activation", desc: "Pop-ups, mall takeovers, influencer ignitions and on-ground spectacles that move stock and shift perception.", color: "from-brand-orange to-brand-magenta" },
  { icon: Calendar, title: "Corporate Events", desc: "Town-halls, annual days, R&Rs and partner meets, choreographed for purpose and produced for prime-time.", color: "from-brand-cyan to-brand-blue" },
  { icon: Sparkles, title: "MICE & Conferences", desc: "Multi-day summits, global exhibitions and international incentive travel — logistics, content and creative under one roof.", color: "from-brand-green to-brand-cyan" },
  { icon: Camera, title: "Weddings & Celebrations", desc: "Bespoke design, destination logistics and obsessive guest-experience for once-in-a-lifetime occasions.", color: "from-brand-magenta to-brand-blue" },
  { icon: Lightbulb, title: "Creative & Production", desc: "Stage design, AV, film, scripts, branding — in-house craft that keeps every detail on-strategy.", color: "from-brand-yellow to-brand-orange" },
  { icon: Globe2, title: "Digital & Hybrid", desc: "Streaming, virtual venues and immersive web — events that travel anywhere your audience is.", color: "from-brand-blue to-brand-magenta" },
];

function Services() {
  return (
    <>
      <section className="noise-bg">
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-28">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-orange mb-4">Services</p>
          <h1 className="font-display text-5xl md:text-7xl font-extrabold leading-[0.95] max-w-5xl">
            Everything live.<br />
            <span className="text-gradient-brand">All under one roof.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Strategy, creative, production and execution — by the same team,
            from kick-off to curtain call.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 grid gap-6 md:grid-cols-2">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.title} className="group relative glass rounded-3xl p-10 overflow-hidden">
                <div className={`absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gradient-to-br ${s.color} opacity-20 group-hover:opacity-50 blur-3xl transition`} />
                <div className={`relative inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color} text-white shadow-glow`}>
                  <Icon size={28} />
                </div>
                <h2 className="relative mt-6 font-display text-3xl font-bold">{s.title}</h2>
                <p className="relative mt-3 text-muted-foreground leading-relaxed">{s.desc}</p>
                <Link to="/contact" className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-cyan">
                  Brief us <ArrowRight size={16} />
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
