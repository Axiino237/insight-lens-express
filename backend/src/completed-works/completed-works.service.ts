import { Injectable, Logger } from "@nestjs/common";
import { CreateCompletedWorkDto } from "./dto/create-completed-work.dto";
import { UpdateCompletedWorkDto } from "./dto/update-completed-work.dto";
import * as fs from "fs";
import * as path from "path";

export interface CompletedWorkItem {
  id: string;
  name: string;
  client: string;
  place: string;
  date: string;
  time: string;
  size: string;
  stallType: string;
  image: string;
  images?: string[];
  description?: string;
  createdAt: string;
}

const DEFAULT_COMPLETED_WORKS: CompletedWorkItem[] = [
  {
    id: "work_1",
    name: "AeroTech 360° Industrial Booth",
    client: "ELGi Compressors",
    place: "Codissia Trade Fair Complex, Coimbatore",
    date: "October 2024",
    time: "4-Day Exhibition",
    size: "12m × 8m (96 sq.m)",
    stallType: "Island Pavilion",
    image: "/stall/IMG-20240419-WA0082.jpg",
    images: [
      "/stall/IMG-20240419-WA0082.jpg",
      "/stall/IMG-20240419-WA0083.jpg",
      "/stall/IMG-20240419-WA0088.jpg",
    ],
    description: "Turnkey four-side open exhibition pavilion featuring heavy machinery load-bearing flooring, overhead tension fabric hanging banner, and VIP meeting lounge.",
    createdAt: "2026-11-10T10:00:00.000Z",
  },
  {
    id: "work_2",
    name: "Precision Engineering Expo Pavilion",
    client: "SEPPINGER Machinery",
    place: "Chennai Trade Centre, Nandambakkam",
    date: "August 2024",
    time: "3-Day Trade Show",
    size: "10m × 6m (60 sq.m)",
    stallType: "3-Side Open",
    image: "/stall/IMG-20240419-WA0083.jpg",
    images: [
      "/stall/IMG-20240419-WA0083.jpg",
      "/stall/IMG-20240419-WA0108.jpg",
      "/stall/IMG-20240419-WA0082.jpg",
    ],
    description: "Custom modular stall with architectural edge-lit acrylic portals, interactive touch kiosks, and seamless CNC-finished reception counters.",
    createdAt: "2026-11-10T10:00:00.000Z",
  },
  {
    id: "work_3",
    name: "Revathi Heavy Drilling Experience Stall",
    client: "Revathi Equipment India Ltd.",
    place: "Pragati Maidan, New Delhi",
    date: "December 2024",
    time: "5-Day International Expo",
    size: "15m × 10m (150 sq.m)",
    stallType: "Double-Decker",
    image: "/stall/IMG-20240419-WA0088.jpg",
    images: [
      "/stall/IMG-20240419-WA0088.jpg",
      "/stall/IMG-20250702-WA0053.jpg",
      "/stall/IMG-20240419-WA0082.jpg",
    ],
    description: "Premium double-deck fabrication with upper-tier executive conference room, downstairs scale equipment demonstration, and warm corporate lighting.",
    createdAt: "2026-11-10T10:00:00.000Z",
  },
  {
    id: "work_4",
    name: "Acoustic & Vibration Technology Showcase",
    client: "Conceptia Marine",
    place: "BIEC, Bengaluru",
    date: "November 2024",
    time: "3-Day Summit",
    size: "8m × 6m (48 sq.m)",
    stallType: "Custom Fabrication",
    image: "/stall/IMG-20240419-WA0108.jpg",
    images: [
      "/stall/IMG-20240419-WA0108.jpg",
      "/stall/IMG-20250702-WA0054.jpg",
      "/stall/IMG-20240419-WA0083.jpg",
    ],
    description: "High-contrast matte black and cyan illuminated pavilion featuring acoustic baffles, live instrumentation stands, and demo product plinths.",
    createdAt: "2026-11-10T10:00:00.000Z",
  },
  {
    id: "work_5",
    name: "Amman Granites Architectural Pavilion",
    client: "Amman Granites",
    place: "HITEX Exhibition Centre, Hyderabad",
    date: "January 2025",
    time: "4-Day Stone & Build Expo",
    size: "12m × 6m (72 sq.m)",
    stallType: "Island Pavilion",
    image: "/stall/IMG-20250702-WA0053.jpg",
    images: [
      "/stall/IMG-20250702-WA0053.jpg",
      "/stall/IMG-20250702-WA0054.jpg",
      "/stall/IMG-20240419-WA0088.jpg",
    ],
    description: "Natural stone cantilever framing with vertical green wall accent, ambient warm LED spotlights, and reinforced slab sample display towers.",
    createdAt: "2026-11-10T10:00:00.000Z",
  },
  {
    id: "work_6",
    name: "TurboPlus Automotive Innovation Center",
    client: "TurboPlus Systems",
    place: "Bombay Exhibition Centre (NESCO), Mumbai",
    date: "February 2025",
    time: "4-Day Auto Expo",
    size: "9m × 6m (54 sq.m)",
    stallType: "Modular Booth",
    image: "/stall/IMG-20250702-WA0054.jpg",
    images: [
      "/stall/IMG-20250702-WA0054.jpg",
      "/stall/IMG-20240419-WA0082.jpg",
      "/stall/IMG-20250702-WA0053.jpg",
    ],
    description: "Sleek aerodynamic curved fascia, dynamic back-lit product shadowboxes, and rapid 24-hour setup and dismantle engineering.",
    createdAt: "2026-11-10T10:00:00.000Z",
  },
];

@Injectable()
export class CompletedWorksService {
  private readonly logger = new Logger(CompletedWorksService.name);
  private readonly dataDir = path.resolve(process.cwd(), "data");
  private readonly filePath = path.join(this.dataDir, "completed-works.json");
  private items: CompletedWorkItem[] = [];

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
        this.items = JSON.parse(raw);
        // Ensure every item has an images array
        let modified = false;
        this.items.forEach((item) => {
          if (!item.images || item.images.length === 0) {
            item.images = item.image ? [item.image] : [];
            modified = true;
          }
        });
        if (modified) {
          this.saveToFile();
        }
      } else {
        this.items = DEFAULT_COMPLETED_WORKS;
        this.saveToFile();
      }
    } catch (e) {
      this.logger.error("Failed to load completed works data", e);
    }
  }

  private saveToFile() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.items, null, 2));
    } catch (e) {
      this.logger.error("Failed to save completed works data", e);
    }
  }

  findAll(): CompletedWorkItem[] {
    this.ensureDataFile();
    return this.items;
  }

  findById(id: string): CompletedWorkItem | undefined {
    this.ensureDataFile();
    return this.items.find((item) => item.id === id);
  }

  create(dto: CreateCompletedWorkDto): CompletedWorkItem {
    this.ensureDataFile();
    const images = Array.isArray(dto.images) && dto.images.length > 0
      ? dto.images
      : (dto.image ? [dto.image] : []);
    const primaryImage = images[0] || dto.image || "";

    const newItem: CompletedWorkItem = {
      id: `work_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: dto.name,
      client: dto.client,
      place: dto.place,
      date: dto.date,
      time: dto.time,
      size: dto.size,
      stallType: dto.stallType,
      image: primaryImage,
      images: images,
      description: dto.description || "",
      createdAt: new Date().toISOString(),
    };

    this.items.unshift(newItem);
    this.saveToFile();
    this.logger.log(`Added new completed work: ${newItem.name} with ${images.length} images`);
    return newItem;
  }

  update(id: string, dto: UpdateCompletedWorkDto): CompletedWorkItem | null {
    this.ensureDataFile();
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) return null;

    const current = this.items[index];
    let newImages = dto.images !== undefined ? dto.images : current.images;
    if ((!newImages || newImages.length === 0) && dto.image) {
      newImages = [dto.image];
    }
    const primaryImage = (newImages && newImages.length > 0) ? newImages[0] : (dto.image || current.image);

    this.items[index] = {
      ...current,
      ...dto,
      image: primaryImage,
      images: newImages,
    };
    this.saveToFile();
    this.logger.log(`Updated completed work: ${id}`);
    return this.items[index];
  }

  delete(id: string): boolean {
    this.ensureDataFile();
    const initialLen = this.items.length;
    this.items = this.items.filter((item) => item.id !== id);
    if (this.items.length !== initialLen) {
      this.saveToFile();
      this.logger.log(`Deleted completed work: ${id}`);
      return true;
    }
    return false;
  }
}
