import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border/50">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img src={logo} alt="The First Step Solutions" className="h-12 w-auto" />
              <span className="font-display font-bold text-xl">
                <span className="text-gradient-warm">First</span>{" "}
                <span className="text-brand-cyan">Solutions</span>
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm text-muted-foreground leading-relaxed">
              Ideas. Innovation. Impact. We craft unforgettable brand experiences,
              corporate events and integrated communication for ambitious brands.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="h-10 w-10 rounded-full glass grid place-items-center hover:bg-white/10 transition">
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
              <li className="flex gap-2"><MapPin size={16} className="text-brand-magenta mt-0.5" /> Chennai, India</li>
              <li className="flex gap-2"><Mail size={16} className="text-brand-orange mt-0.5" /> hello@firstsolutions.co</li>
              <li className="flex gap-2"><Phone size={16} className="text-brand-cyan mt-0.5" /> +91 98000 00000</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} The First Step Solutions. All rights reserved.</p>
          <p>Ideas · Innovation · Impact</p>
        </div>
      </div>
    </footer>
  );
}
