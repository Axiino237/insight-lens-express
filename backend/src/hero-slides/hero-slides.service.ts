import { Injectable, Logger } from "@nestjs/common";
import { CreateHeroSlideDto } from "./dto/create-hero-slide.dto";
import { UpdateHeroSlideDto } from "./dto/update-hero-slide.dto";
import * as fs from "fs";
import * as path from "path";

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  badge: string;
  desc: string;
  footprint: string;
  structure: string;
  format: string;
  image: string;
  accent: string;
  createdAt: string;
}

const DEFAULT_SLIDES: HeroSlide[] = [
  {
    id: "slide_1",
    badge: "★ Flagship Fabrication",
    tag: "Exhibition Architecture · Auto Expo",
    title: "AeroTech 360° Custom Modular Stall",
    subtitle: "Turnkey 3D Exhibition Pavilion",
    desc: "Custom-engineered modular exhibition architecture with precision steel-truss framing, edge-lit fabric displays, and an immersive central product demonstration lounge designed for high footfall and brand engagement.",
    footprint: "12m × 8m",
    structure: "Double-Decker",
    format: "Island Pavilion",
    image: "default_hero_1",
    accent: "from-brand-orange to-brand-magenta",
    createdAt: "2026-11-10T10:00:00.000Z",
  },
  {
    id: "slide_2",
    badge: "★ Bespoke Staging",
    tag: "Precision Engineering · IMTEX Global",
    title: "Eppinger High-Precision Tooling Stall",
    subtitle: "Ergonomic B2B Showcase Architecture",
    desc: "Futuristic architectural geometry featuring continuous overhead cantilever fascia, integrated recessed downlighting, and ergonomic presentation counters tailored for live B2B client meetings and live machinery display.",
    footprint: "15m × 10m",
    structure: "Cantilever Fascia",
    format: "Dual-Corner Open",
    image: "default_hero_2",
    accent: "from-brand-cyan to-brand-blue",
    createdAt: "2026-11-10T10:00:00.000Z",
  },
];

@Injectable()
export class HeroSlidesService {
  private readonly logger = new Logger(HeroSlidesService.name);
  private readonly dataDir = path.resolve(process.cwd(), "data");
  private readonly filePath = path.join(this.dataDir, "hero-slides.json");
  private slides: HeroSlide[] = [];

  constructor() {
    this.ensureDataFile();
  }

  private ensureDataFile() {
    try {
      if (!fs.existsSync(this.dataDir)) {
        fs.mkdirSync(this.dataDir, { recursive: true });
      }

      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, "utf-8");
        this.slides = JSON.parse(raw);
      } else {
        this.slides = DEFAULT_SLIDES;
        this.saveToFile();
      }
    } catch (e) {
      this.logger.error("Failed to load hero slides data", e);
    }
  }

  private saveToFile() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.slides, null, 2));
    } catch (e) {
      this.logger.error("Failed to save hero slides data", e);
    }
  }

  findAll(): HeroSlide[] {
    this.ensureDataFile();
    return this.slides;
  }

  findById(id: string): HeroSlide | undefined {
    this.ensureDataFile();
    return this.slides.find((s) => s.id === id);
  }

  create(dto: CreateHeroSlideDto): HeroSlide {
    this.ensureDataFile();
    const newSlide: HeroSlide = {
      id: `hero_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      title: dto.title,
      subtitle: dto.subtitle || "Turnkey 3D Exhibition Pavilion",
      tag: dto.tag || "Exhibition Architecture",
      badge: dto.badge || "★ Flagship Fabrication",
      desc: dto.desc || "",
      footprint: dto.footprint || "10m × 8m",
      structure: dto.structure || "Modular Architecture",
      format: dto.format || "Island Pavilion",
      image: dto.image,
      accent: dto.accent || "from-brand-orange to-brand-magenta",
      createdAt: new Date().toISOString(),
    };

    this.slides.push(newSlide);
    this.saveToFile();
    this.logger.log(`Created new hero slide: ${newSlide.title}`);
    return newSlide;
  }

  update(id: string, dto: UpdateHeroSlideDto): HeroSlide | null {
    this.ensureDataFile();
    const index = this.slides.findIndex((s) => s.id === id);
    if (index === -1) return null;

    this.slides[index] = {
      ...this.slides[index],
      ...dto,
      id,
    };
    this.saveToFile();
    this.logger.log(`Updated hero slide with id: ${id}`);
    return this.slides[index];
  }

  delete(id: string): boolean {
    this.ensureDataFile();
    const initialLen = this.slides.length;
    this.slides = this.slides.filter((s) => s.id !== id);
    if (this.slides.length !== initialLen) {
      this.saveToFile();
      this.logger.log(`Deleted hero slide with id: ${id}`);
      return true;
    }
    return false;
  }
}

