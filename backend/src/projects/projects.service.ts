import { Injectable } from "@nestjs/common";

export interface ProjectItem {
  id: string;
  title: string;
  tag: string;
  badge?: string;
  desc: string;
  accent: string;
}

@Injectable()
export class ProjectsService {
  private readonly projects: ProjectItem[] = [
    {
      id: "polystone-expo-stall",
      title: "Polystone Expo Stall",
      tag: "Exhibition Stall Fabrication",
      badge: "★ Flagship Fabrication",
      desc: "Custom 3D exhibition architecture and interactive product display pavilion engineered for maximum visitor immersion and footfall.",
      accent: "from-brand-orange to-brand-magenta",
    },
    {
      id: "pixel-bloom",
      title: "Pixel Bloom Activation",
      tag: "Brand Activation",
      desc: "Multi-sensory pop-up installation & immersive audience engagement spectacle.",
      accent: "from-brand-cyan to-brand-blue",
    },
    {
      id: "vision-2030",
      title: "Vision 2030 Summit",
      tag: "Conference & Summit",
      desc: "High-level leadership convention with intelligent stagecraft & dynamic lighting.",
      accent: "from-brand-orange to-brand-magenta",
    },
    {
      id: "aurum-awards",
      title: "Aurum Awards Night",
      tag: "Awards Gala",
      desc: "Prestigious gala dinner & recognition event with concert-grade audiovisuals.",
      accent: "from-brand-green to-brand-cyan",
    },
  ];

  findAll(): ProjectItem[] {
    return this.projects;
  }

  findOne(id: string): ProjectItem | undefined {
    return this.projects.find((p) => p.id === id);
  }
}

