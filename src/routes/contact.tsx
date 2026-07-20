import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Mail, Phone, MapPin, Send, ChevronDown } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact The First Step Solutions — Chennai Event Agency" },
      { name: "description", content: "Contact The First Step Solutions, Chennai's top event management agency. Call +91 44 3153 6968, email hello@thefirststepsolutions.co. Submit your event brief and we'll respond within 24 hours." },
      { name: "keywords", content: "contact the first step solutions, first step solutions phone number, first step solutions email, first step solutions address chennai, event support, event planners contact, chennai event managers phone, hire event agency, event management office address, request event quote, wedding planners contact number, stall fabrication query, book corporate event organizers, hire brand activation team, event budget estimator, customised stall fabrication inquiry" },
      { property: "og:title", content: "Contact The First Step Solutions — Chennai Event Agency" },
      { property: "og:description", content: "Let's build the next unforgettable brand experience. Send us your event brief." },
      { property: "og:url", content: "https://www.thefirststepsolutions.com/contact" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://www.thefirststepsolutions.com/logo.png" },
      { property: "og:site_name", content: "The First Step Solutions" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Contact — The First Step Solutions" },
      { name: "twitter:description", content: "Let's build the next unforgettable brand experience. Send us your event brief." },
      { name: "twitter:image", content: "https://www.thefirststepsolutions.com/logo.png" },
    ],
    links: [
      { rel: "canonical", href: "https://www.thefirststepsolutions.com/contact" },
    ],
  }),
  component: () => (
    <Layout>
      <Contact />
    </Layout>
  ),
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <section className="noise-bg">
        <div className="mx-auto max-w-7xl px-4 pt-6 pb-16 md:pt-10 md:pb-24">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-cyan mb-6">Get in touch</p>
          <h1 className="font-display text-5xl md:text-7xl font-extrabold leading-[0.95] max-w-4xl">
            Tell us about<br />
            <span className="text-gradient-brand">your next moment.</span>
          </h1>
        </div>
      </section>

      <section className="pt-10 pb-32 md:pt-14 md:pb-40">
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3 glass rounded-3xl p-8 md:p-12">
            {sent ? (
              <div className="py-20 text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h2 className="font-display text-3xl font-bold">Brief received.</h2>
                <p className="mt-3 text-muted-foreground">A producer will reach out within 24 hours.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-5">
                  <Field label="Your name" id="name" required />
                  <Field label="Company" id="company" />
                  <Field label="Email" id="email" type="email" required />
                  <Field label="Phone" id="phone" type="tel" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground">Service of interest</label>
                  <div className="relative">
                    <select className="w-full appearance-none rounded-xl bg-input border border-border px-4 py-3 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-magenta">
                      <option>Brand Activation</option>
                      <option>Corporate Event</option>
                      <option>Conference / MICE</option>
                      <option>Wedding / Celebration</option>
                      <option>Product Launch</option>
                      <option>Stall Fabrication</option>
                      <option>Other</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-muted-foreground">
                      <ChevronDown size={18} />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-muted-foreground">Tell us about your brief</label>
                  <textarea
                    rows={5}
                    className="w-full rounded-xl bg-input border border-border px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-magenta resize-none"
                    placeholder="What are you celebrating? When? Where? How many people?"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-warm px-7 py-4 font-semibold text-white shadow-glow hover:opacity-90 transition"
                >
                  Send Brief <Send size={16} />
                </button>
              </form>
            )}
          </div>

          <div className="lg:col-span-2 space-y-4">
            <InfoCard 
              icon={Mail} 
              title="Email" 
              lines={["hello@thefirststepsolutions.com"]} 
              accent="text-brand-orange" 
              link="mailto:hello@thefirststepsolutions.com"
            />
            <InfoCard 
              icon={Phone} 
              title="Call" 
              lines={[
                "+91 44 3153 6968",
                "+91 72004 95699",
                "+91 93449 83802",
                "Mon–Sat · 9:30am to 6.30pm IST"
              ]} 
              accent="text-brand-cyan" 
            />
            <InfoCard 
              icon={MapPin} 
              title="Visit" 
              lines={["Flat No. 27, 1st Street, Kothari Nagar,", "Annai Sathya Nagar Main Road,", "Ramapuram, Chennai 600089, India"]} 
              accent="text-brand-magenta" 
              link="https://www.google.com/maps/search/?api=1&query=13.036249450670583,80.18479590559821"
            />
          </div>
        </div>
      </section>

      {/* GOOGLE MAP SECTION */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-black/40 p-1 md:p-2 shadow-card">
            <iframe 
              src="https://maps.google.com/maps?q=13.036249450670583,80.18479590559821&z=17&output=embed" 
              className="w-full h-[350px] md:h-[450px] rounded-2xl border-0 opacity-80 hover:opacity-100 transition-opacity duration-300"
              allowFullScreen
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="The First Step Solutions Office Location"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, id, type = "text", required }: { label: string; id: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-2 text-muted-foreground">{label}{required && <span className="text-brand-magenta"> *</span>}</label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="w-full rounded-xl bg-input border border-border px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-brand-magenta"
      />
    </div>
  );
}

function InfoCard({ 
  icon: Icon, 
  title, 
  lines, 
  accent, 
  link 
}: { 
  icon: typeof Mail; 
  title: string; 
  lines: string[]; 
  accent: string; 
  link?: string; 
}) {
  const content = (
    <>
      {lines.map((l) => (
        <p key={l} className={`text-sm text-muted-foreground ${link ? "hover:text-brand-cyan transition-colors" : ""}`}>{l}</p>
      ))}
    </>
  );

  return (
    <div className="glass rounded-2xl p-6">
      <div className={`inline-flex h-10 w-10 rounded-xl glass items-center justify-center ${accent}`}>
        <Icon size={18} />
      </div>
      <h3 className="font-display text-lg font-bold mt-3">{title}</h3>
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" className="block mt-1">
          {content}
        </a>
      ) : (
        <div className="mt-1">{content}</div>
      )}
    </div>
  );
}
