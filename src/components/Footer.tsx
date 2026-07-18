import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Youtube, Mail, Phone, MapPin, Eye } from "lucide-react";
import logo from "@/assets/logo.png";
import { useVisitorCount } from "@/hooks/useVisitorCount";

export function Footer() {
  const visitorCount = useVisitorCount();

  return (
    <footer className="relative mt-32 border-t border-border/50">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img src={logo} alt="The First Step Solutions" className="h-8 w-auto" />
              <span className="font-display font-bold text-xl">
                <span className="text-muted-foreground">The</span>{" "}
                <span className="text-gradient-warm">First Step</span>{" "}
                <span className="text-brand-cyan">Solutions</span>
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm text-muted-foreground leading-relaxed">
              Ideas. Innovation. Impact. We craft unforgettable brand experiences,
              corporate events and integrated communication for ambitious brands.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/the_first_step_solutions/" },
                { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/the-first-step-solutions/" },
                { Icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@thefirststepsolutions" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="h-10 w-10 rounded-full glass grid place-items-center hover:bg-white/10 transition"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-brand-cyan transition">About</Link></li>
              <li><Link to="/services" className="hover:text-brand-cyan transition">Services</Link></li>
              <li><Link to="/work" className="hover:text-brand-cyan transition">Work</Link></li>
              <li><Link to="/contact" className="hover:text-brand-cyan transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Reach Us</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <MapPin size={16} className="text-brand-magenta mt-0.5 shrink-0" />
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=13.036249450670583,80.18479590559821" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-brand-cyan transition-colors"
                >
                  Flat No. 27, 1st Street, Kothari Nagar,<br />Annai Sathya Nagar Main Road,<br />Ramapuram, Chennai 600089
                </a>
              </li>
              <li className="flex gap-2">
                <Mail size={16} className="text-brand-orange mt-0.5" />
                <a href="mailto:hello@thefirststepsolutions.com" className="hover:text-brand-cyan transition">
                  hello@thefirststepsolutions.com
                </a>
              </li>
              <li className="flex gap-2 items-start">
                <Phone size={16} className="text-brand-cyan mt-1 shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+914431536968" className="hover:text-brand-cyan transition">
                    +91 44 3153 6968
                  </a>
                  <a href="tel:+917200495699" className="hover:text-brand-cyan transition">
                    +91 72004 95699
                  </a>
                  <a href="tel:+919344983802" className="hover:text-brand-cyan transition">
                    +91 93449 83802
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} The First Step Solutions. All rights reserved.</p>

          {/* Visitor Counter */}
          <div className="flex items-center gap-2 glass rounded-full px-4 py-1.5">
            <Eye size={13} className="text-brand-cyan animate-pulse" />
            <span className="tracking-wide">
              {visitorCount === null ? (
                <span className="opacity-50">counting...</span>
              ) : (
                <>
                  <span className="font-semibold text-foreground tabular-nums">
                    {visitorCount.toLocaleString()}
                  </span>
                  {" "}visitors
                </>
              )}
            </span>
          </div>

          <p>
            Developed by{" "}
            <a
              href="https://axiino.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gradient-warm hover:opacity-80 transition"
            >
              Axiino
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

