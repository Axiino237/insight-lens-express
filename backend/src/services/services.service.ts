import { Injectable } from "@nestjs/common";

export interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  icon: string;
  accent: string;
}

@Injectable()
export class ServicesService {
  private readonly services: ServiceItem[] = [
    {
      id: "stall-fabrication",
      title: "Stall Fabrication",
      desc: "Custom exhibition booths & trade show stalls designed and built for maximum engagement.",
      icon: "Cuboid",
      accent: "from-brand-orange to-brand-magenta",
    },
    {
      id: "brand-activation",
      title: "Brand Activation",
      desc: "Live, breathing experiences that turn audiences into advocates.",
      icon: "Flame",
      accent: "from-brand-cyan to-brand-blue",
    },
    {
      id: "corporate-events",
      title: "Corporate Events",
      desc: "Conferences, summits & town-halls executed with cinematic precision.",
      icon: "Presentation",
      accent: "from-brand-green to-brand-cyan",
    },
    {
      id: "mice-conferences",
      title: "MICE & Conferences",
      desc: "End-to-end meetings, incentives & exhibitions across the globe.",
      icon: "Network",
      accent: "from-brand-magenta to-brand-blue",
    },
    {
      id: "weddings-celebrations",
      title: "Weddings & Celebrations",
      desc: "Once-in-a-lifetime moments, crafted with obsessive detail.",
      icon: "Wine",
      accent: "from-brand-yellow to-brand-orange",
    },
    {
      id: "creative-production",
      title: "Creative & Production",
      desc: "Concept, content, stage & screen — all under one roof.",
      icon: "Clapperboard",
      accent: "from-brand-blue to-brand-magenta",
    },
    {
      id: "digital-solutions",
      title: "Digital Solutions",
      desc: "Hybrid & virtual experiences that travel without borders.",
      icon: "MonitorSmartphone",
      accent: "from-brand-cyan to-brand-green",
    },
  ];

  findAll(): ServiceItem[] {
    return this.services;
  }

  findOne(id: string): ServiceItem | undefined {
    return this.services.find((s) => s.id === id);
  }
}

