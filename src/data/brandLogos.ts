import logo1 from "@/assets/brand logo/amvi logo.jpg.jpeg";
import logo2 from "@/assets/brand logo/WhatsApp Image 2026-09-16 at 12.50.12 PM (1).jpeg";
import logo3 from "@/assets/brand logo/WhatsApp Image 2026-09-16 at 12.50.12 PM (2).jpeg";
import logo4 from "@/assets/brand logo/WhatsApp Image 2026-09-16 at 12.50.12 PM (3).jpeg";
import logo5 from "@/assets/brand logo/WhatsApp Image 2026-09-16 at 12.50.12 PM.jpeg";
import logo6 from "@/assets/brand logo/WhatsApp Image 2026-09-16 at 12.50.13 PM (1).jpeg";
import logo7 from "@/assets/brand logo/WhatsApp Image 2026-09-16 at 12.50.13 PM (10).jpeg";
import logo8 from "@/assets/brand logo/WhatsApp Image 2026-09-16 at 12.50.13 PM (11).jpeg";
import logo9 from "@/assets/brand logo/WhatsApp Image 2026-09-16 at 12.50.13 PM (13).jpeg";
import logo10 from "@/assets/brand logo/WhatsApp Image 2026-09-16 at 12.50.13 PM (14).jpeg";
import logo11 from "@/assets/brand logo/WhatsApp Image 2026-09-16 at 12.50.13 PM (2).jpeg";
import logo12 from "@/assets/brand logo/WhatsApp Image 2026-09-16 at 12.50.13 PM (4).jpeg";
import logo13 from "@/assets/brand logo/WhatsApp Image 2026-09-16 at 12.50.13 PM (5).jpeg";
import logo14 from "@/assets/brand logo/WhatsApp Image 2026-09-16 at 12.50.13 PM (6).jpeg";
import logo15 from "@/assets/brand logo/WhatsApp Image 2026-09-16 at 12.50.13 PM (7).jpeg";
import logo16 from "@/assets/brand logo/WhatsApp Image 2026-09-16 at 12.50.13 PM (8).jpeg";
import logo17 from "@/assets/brand logo/WhatsApp Image 2026-09-16 at 12.50.13 PM (9).jpeg";
import logo18 from "@/assets/brand logo/WhatsApp Image 2026-09-16 at 12.50.13 PM.jpeg";

export interface BrandLogo {
  id: number;
  src: string;
  alt: string;
  cardBg?: string;
  cardClassName?: string;
  imageClassName?: string;
}

export const brandLogos: BrandLogo[] = [
  {
    id: 1,
    src: logo1,
    alt: "Amvi",
    imageClassName: "scale-[1.02] md:scale-[1.05]",
  },
  {
    id: 2,
    src: logo2,
    alt: "Simmac",
    imageClassName: "scale-[1.05] md:scale-[1.1]",
  },
  { id: 3, src: logo3, alt: "Brand Partner Logo" },
  { id: 4, src: logo4, alt: "Brand Partner Logo" },
  {
    id: 5,
    src: logo5,
    alt: "Jital",
    imageClassName: "scale-[1.1] md:scale-[1.15]",
  },
  { id: 6, src: logo6, alt: "Brand Partner Logo" },
  {
    id: 7,
    src: logo7,
    alt: "Brand Partner Logo",
    imageClassName: "scale-[1.1] md:scale-[1.15]",
  },
  {
    id: 8,
    src: logo8,
    alt: "Brand Partner Logo",
    imageClassName: "scale-[1.08] md:scale-[1.12]",
  },
  {
    id: 9,
    src: logo9,
    alt: "GECO Crusher",
    imageClassName: "scale-[1.15] md:scale-[1.2]",
  },
  { id: 10, src: logo10, alt: "Brand Partner Logo" },
  {
    id: 11,
    src: logo11,
    alt: "Mekark",
    cardBg: "#ed1b24",
    cardClassName: "!bg-[#ed1b24] border-red-500/30",
    imageClassName: "scale-[1.1] md:scale-[1.15]",
  },
  {
    id: 12,
    src: logo12,
    alt: "Brand Partner Logo",
    imageClassName: "scale-[1.08] md:scale-[1.12]",
  },
  {
    id: 13,
    src: logo13,
    alt: "Unique Equipments",
    imageClassName: "scale-[1.28] md:scale-[1.35] translate-y-[1px]",
  },
  { id: 14, src: logo14, alt: "Brand Partner Logo" },
  {
    id: 15,
    src: logo15,
    alt: "Brand Partner Logo",
    imageClassName: "scale-[1.08] md:scale-[1.12]",
  },
  {
    id: 16,
    src: logo16,
    alt: "Janatha Agro",
    imageClassName: "scale-[1.02] md:scale-[1.05]",
  },
  {
    id: 17,
    src: logo17,
    alt: "Madhuli Industries",
    imageClassName: "scale-[1.02] md:scale-[1.05]",
  },
  {
    id: 18,
    src: logo18,
    alt: "Brand Partner Logo",
    imageClassName: "scale-[1.1] md:scale-[1.15] translate-x-[3px]",
  },
];
