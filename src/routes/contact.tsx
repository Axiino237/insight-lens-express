import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Mail, Phone, MapPin, Send, ChevronDown } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — The First Step Solutions" },
      { name: "description", content: "Drop your brief. We'll respond within 24 hours." },
      { property: "og:title", content: "Contact — The First Step Solutions" },
      { property: "og:description", content: "Let's build the next unforgettable thing." },
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
        <div className="mx-auto max-w-7xl px-4 py-20 md:py-28">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-cyan mb-4">Get in touch</p>
          <h1 className="font-display text-5xl md:text-7xl font-extrabold leading-[0.95] max-w-4xl">
            Tell us about<br />
            <span className="text-gradient-brand">your next moment.</span>
          </h1>
        </div>
      </section>

      <section className="pb-24">
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
            <InfoCard icon={Mail} title="Email" lines={["hello@firstsolutions.co", "newbusiness@firstsolutions.co"]} accent="text-brand-orange" />
            <InfoCard icon={Phone} title="Call" lines={["+91 44 3153 6968", "Mon–Sat · 9:30am to 6.30pm IST"]} accent="text-brand-cyan" />
            <InfoCard icon={MapPin} title="Visit" lines={["Flat No. 27, 1st Street, Kothari Nagar,", "Annai Sathya Nagar Main Road,", "Ramapuram, Chennai 600089, India"]} accent="text-brand-magenta" />
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

function InfoCard({ icon: Icon, title, lines, accent }: { icon: typeof Mail; title: string; lines: string[]; accent: string }) {
  return (
    <div className="glass rounded-2xl p-6">
      <div className={`inline-flex h-10 w-10 rounded-xl glass items-center justify-center ${accent}`}>
        <Icon size={18} />
      </div>
      <h3 className="font-display text-lg font-bold mt-3">{title}</h3>
      {lines.map((l) => (
        <p key={l} className="text-sm text-muted-foreground">{l}</p>
      ))}
    </div>
  );
}
