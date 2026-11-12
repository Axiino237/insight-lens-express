import { Injectable, Logger } from "@nestjs/common";
import { CreateShowcaseDto } from "./dto/create-showcase.dto";
import { UpdateShowcaseDto } from "./dto/update-showcase.dto";
import * as fs from "fs";
import * as path from "path";

export interface ShowcaseItem {
  id: string;
  name: string;
  classification: string;
  image: string;
  description?: string;
  createdAt: string;
}

const DEFAULT_STALLS: ShowcaseItem[] = [
  {
    id: "stall_1",
    name: "Modern Industrial Booth",
    classification: "Custom Fabrication",
    image: "/stall/IMG-20240419-WA0082.jpg",
    createdAt: "2026-11-10T10:00:00.000Z",
  },
  {
    id: "stall_2",
    name: "Dynamic Product Pavilion",
    classification: "Exhibition Stall",
    image: "/stall/IMG-20240419-WA0083.jpg",
    createdAt: "2026-11-10T10:00:00.000Z",
  },
  {
    id: "stall_3",
    name: "Acoustic & Tech Display",
    classification: "Trade Show",
    image: "/stall/IMG-20240419-WA0088.jpg",
    createdAt: "2026-11-10T10:00:00.000Z",
  },
  {
    id: "stall_4",
    name: "Premium Expo Setup",
    classification: "Modular Booth",
    image: "/stall/IMG-20240419-WA0108.jpg",
    createdAt: "2026-11-10T10:00:00.000Z",
  },
  {
    id: "stall_5",
    name: "Corporate Experience Center",
    classification: "Exhibition Stall",
    image: "/stall/IMG-20250702-WA0053.jpg",
    createdAt: "2026-11-10T10:00:00.000Z",
  },
  {
    id: "stall_6",
    name: "Futuristic Brand Booth",
    classification: "Custom Fabrication",
    image: "/stall/IMG-20250702-WA0054.jpg",
    createdAt: "2026-11-10T10:00:00.000Z",
  },
  {
    id: "stall_7",
    name: "Grand Atrium Pavilion",
    classification: "Trade Show",
    image: "/stall/IMG_9125.PNG",
    createdAt: "2026-11-10T10:00:00.000Z",
  },
  {
    id: "stall_8",
    name: "High-Impact Product Display",
    classification: "Expo Stall",
    image: "/stall/IMG_9126.PNG",
    createdAt: "2026-11-10T10:00:00.000Z",
  },
  {
    id: "stall_9",
    name: "Illuminated Truss Stall",
    classification: "Custom Fabrication",
    image: "/stall/IMG_9127.PNG",
    createdAt: "2026-11-10T10:00:00.000Z",
  },
  {
    id: "stall_10",
    name: "Interactive Product Lounge",
    classification: "Exhibition Stall",
    image: "/stall/IMG_9129.PNG",
    createdAt: "2026-11-10T10:00:00.000Z",
  },
  {
    id: "stall_11",
    name: "Open-Concept Showcase",
    classification: "Trade Show",
    image: "/stall/IMG_9130.PNG",
    createdAt: "2026-11-10T10:00:00.000Z",
  },
  {
    id: "stall_12",
    name: "Architectural Exhibition Stand",
    classification: "Custom Fabrication",
    image: "/stall/Screenshot_20250704_220106.jpg",
    createdAt: "2026-11-10T10:00:00.000Z",
  },
  {
    id: "stall_13",
    "name": "Curved LED Pavilion",
    classification: "Expo Stall",
    image: "/stall/Screenshot_20250704_220131.jpg",
    createdAt: "2026-11-10T10:00:00.000Z",
  },
  {
    id: "stall_14",
    name: "Multi-Tiered Display Center",
    classification: "Exhibition Stall",
    image: "/stall/Screenshot_20250704_222302.jpg",
    createdAt: "2026-11-10T10:00:00.000Z",
  },
  {
    id: "stall_15",
    name: "Precision Brand Showcase",
    classification: "Custom Fabrication",
    image: "/stall/Screenshot_20250704_223741.jpg",
    createdAt: "2026-11-10T10:00:00.000Z",
  },
  {
    id: "stall_16",
    name: "Elevated Expo Experience",
    classification: "Trade Show",
    image: "/stall/Screenshot_20250704_223749.jpg",
    createdAt: "2026-11-10T10:00:00.000Z",
  },
  {
    id: "stall_17",
    name: "Immersive Retail Booth",
    classification: "Modular Booth",
    image: "/stall/Screenshot_20250704_223758.jpg",
    createdAt: "2026-11-10T10:00:00.000Z",
  },
  {
    id: "stall_18",
    name: "Sleek Minimalist Stall",
    classification: "Exhibition Stall",
    image: "/stall/Screenshot_20250704_224515.jpg",
    createdAt: "2026-11-10T10:00:00.000Z",
  },
  {
    id: "stall_19",
    name: "Signature Event Pavilion",
    classification: "Custom Fabrication",
    image: "/stall/Screenshot_20250704_224556.jpg",
    createdAt: "2026-11-10T10:00:00.000Z",
  },
];

@Injectable()
export class ShowcaseService {
  private readonly logger = new Logger(ShowcaseService.name);
  private readonly dataDir = path.resolve(process.cwd(), "data");
  private readonly filePath = path.join(this.dataDir, "showcase.json");
  private items: ShowcaseItem[] = [];

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
      } else {
        this.items = DEFAULT_STALLS;
        this.saveToFile();
      }
    } catch (e) {
      this.logger.error("Failed to load showcase data", e);
    }
  }

  private saveToFile() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.items, null, 2));
    } catch (e) {
      this.logger.error("Failed to save showcase data", e);
    }
  }

  findAll(): ShowcaseItem[] {
    this.ensureDataFile();
    return this.items;
  }

  findById(id: string): ShowcaseItem | undefined {
    this.ensureDataFile();
    return this.items.find((item) => item.id === id);
  }

  create(dto: CreateShowcaseDto): ShowcaseItem {
    this.ensureDataFile();
    const newItem: ShowcaseItem = {
      ...dto,
      id: `stall_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
    };

    this.items.unshift(newItem);
    this.saveToFile();
    this.logger.log(`Created new showcase item: ${dto.name} (${dto.classification})`);
    return newItem;
  }

  update(id: string, dto: UpdateShowcaseDto): ShowcaseItem | null {
    this.ensureDataFile();
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) return null;

    this.items[index] = {
      ...this.items[index],
      ...dto,
      id,
    };
    this.saveToFile();
    this.logger.log(`Updated showcase item with id: ${id}`);
    return this.items[index];
  }

  delete(id: string): boolean {
    this.ensureDataFile();
    const initialLen = this.items.length;
    this.items = this.items.filter((item) => item.id !== id);
    if (this.items.length !== initialLen) {
      this.saveToFile();
      this.logger.log(`Deleted showcase item with id: ${id}`);
      return true;
    }
    return false;
  }
}
