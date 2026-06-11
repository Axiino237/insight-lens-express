import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { BirdAnimation } from "./BirdAnimation";
import logo from "@/assets/logo.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto mt-4 max-w-7xl px-4">
        <div className="glass rounded-2xl flex items-center justify-between px-4 py-3 md:px-6">
          <Link to="/" className="flex items-center gap-3">
            <BirdAnimation className="h-8 md:h-10 w-auto" speedMs={45} />
            <span className="font-display font-bold text-base md:text-xl leading-tight whitespace-nowrap">
              <span className="text-muted-foreground">The</span>{" "}
              <span className="text-gradient-warm">First Step</span>{" "}
              <span className="text-brand-cyan">Solutions</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full"
                activeProps={{ className: "px-4 py-2 text-sm font-semibold text-foreground rounded-full bg-white/5" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <a
              href="https://www.umshiv.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 rounded-full px-[1px] py-[1px] bg-gradient-umshiv shadow-glow-umshiv hover:shadow-[0_0_30px_rgba(202,168,90,0.5)] transition-all"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-background/80 backdrop-blur px-4 py-2 text-sm font-semibold text-foreground group-hover:bg-background/60 transition-colors">
                <span className="h-2 w-2 rounded-full bg-[#3da86c] animate-pulse" />
                Go to the Tree
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-gradient-warm px-5 py-2.5 text-sm font-semibold text-white shadow-glow hover:opacity-90 transition"
            >
              Let's Talk
            </Link>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden glass mt-2 rounded-2xl p-4 flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground rounded-xl hover:bg-white/5"
              >
                {n.label}
              </Link>
            ))}
            <a
              href="https://www.umshiv.com/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 group relative inline-flex items-center justify-center gap-2 rounded-full px-[1px] py-[1px] bg-gradient-umshiv shadow-glow-umshiv hover:shadow-[0_0_30px_rgba(202,168,90,0.5)] transition-all"
            >
              <span className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-background/80 backdrop-blur px-5 py-3 text-sm font-semibold text-foreground group-hover:bg-background/60 transition-colors">
                <span className="h-2 w-2 rounded-full bg-[#3da86c] animate-pulse" />
                Go to the Tree
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-gradient-warm px-5 py-3 text-sm font-semibold text-white"
            >
              Let's Talk
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
