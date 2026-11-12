import { Injectable, Logger } from "@nestjs/common";
import { CreateUpcomingExpoDto } from "./dto/create-upcoming-expo.dto";
import { UpdateUpcomingExpoDto } from "./dto/update-upcoming-expo.dto";
import * as fs from "fs";
import * as path from "path";

export interface UpcomingExpoItem {
  id: string;
  name: string;
  sector: string;
  date: string;
  time: string;
  place: string;
  city: string;
  status: string;
  edition?: string;
  websiteUrl?: string;
  createdAt: string;
}

const DEFAULT_UPCOMING_EXPOS: UpcomingExpoItem[] = [
  {
    id: "expo_1",
    name: "IMTEX 2025 & Tooltech",
    edition: "21st Edition",
    sector: "Manufacturing & Machine Tools",
    date: "23–29 Jan 2025",
    time: "10:00 AM – 6:00 PM (7 Days)",
    place: "BIEC (Bangalore International Exhibition Centre)",
    city: "Bengaluru",
    status: "Booking Open",
    websiteUrl: "https://www.imtex.in",
    createdAt: "2026-11-10T10:00:00.000Z",
  },
  {
    id: "expo_2",
    name: "Auto Expo 2025 — Components & Mobility",
    edition: "17th Edition",
    sector: "Automotive & EV Mobility",
    date: "17–22 Jan 2025",
    time: "10:00 AM – 6:00 PM (6 Days)",
    place: "Pragati Maidan (IECC)",
    city: "New Delhi",
    status: "Stall Design Active",
    websiteUrl: "https://www.autoexpo.in",
    createdAt: "2026-11-10T10:00:00.000Z",
  },
  {
    id: "expo_3",
    name: "ACETECH Architecture, Construction & Design",
    edition: "Annual Expo",
    sector: "Architecture & Building Materials",
    date: "13–16 Feb 2025",
    time: "10:00 AM – 7:00 PM (4 Days)",
    place: "Bombay Exhibition Centre (NESCO)",
    city: "Mumbai",
    status: "Booking Open",
    websiteUrl: "https://www.etacetech.com",
    createdAt: "2026-11-10T10:00:00.000Z",
  },
  {
    id: "expo_4",
    name: "Plastindia 2025",
    edition: "12th Edition",
    sector: "Plastics, Polymers & Packaging",
    date: "05–10 Feb 2025",
    time: "10:00 AM – 6:00 PM (6 Days)",
    place: "Bharat Mandapam",
    city: "New Delhi",
    status: "Booking Open",
    websiteUrl: "https://www.plastindia.org",
    createdAt: "2026-11-10T10:00:00.000Z",
  },
  {
    id: "expo_5",
    name: "Acrex India 2025 — HVAC & Smart Buildings",
    edition: "25th Silver Jubilee",
    sector: "HVAC, Clean Energy & Refrigeration",
    date: "20–22 Feb 2025",
    time: "9:30 AM – 6:00 PM (3 Days)",
    place: "BIEC (Bangalore International Exhibition Centre)",
    city: "Bengaluru",
    status: "Fast Filling",
    websiteUrl: "https://www.acrex.in",
    createdAt: "2026-11-10T10:00:00.000Z",
  },
  {
    id: "expo_6",
    name: "Elecrama 2025 — World Electricity Forum",
    edition: "16th Edition",
    sector: "Electrical, Power & Transmission",
    date: "22–26 Feb 2025",
    time: "10:00 AM – 6:00 PM (5 Days)",
    place: "India Expo Centre & Mart",
    city: "Greater Noida",
    status: "Booking Open",
    websiteUrl: "https://www.elecrama.com",
    createdAt: "2026-11-10T10:00:00.000Z",
  },
  {
    id: "expo_7",
    name: "INTEC 2025 — Industrial Trade Fair",
    edition: "20th Edition",
    sector: "Industrial Automation & Engineering",
    date: "05–09 Jun 2025",
    time: "10:00 AM – 5:30 PM (5 Days)",
    place: "CODISSIA Trade Fair Complex",
    city: "Coimbatore",
    status: "Booking Open",
    websiteUrl: "https://intec.codissia.com",
    createdAt: "2026-11-10T10:00:00.000Z",
  },
  {
    id: "expo_8",
    name: "Medicall Chennai 2025",
    edition: "38th Edition",
    sector: "Healthcare & Medical Equipment",
    date: "01–03 Aug 2025",
    time: "10:00 AM – 6:00 PM (3 Days)",
    place: "Chennai Trade Centre",
    city: "Chennai",
    status: "Early Bird Open",
    websiteUrl: "https://www.medicall.in",
    createdAt: "2026-11-10T10:00:00.000Z",
  },
];

@Injectable()
export class UpcomingExposService {
  private readonly logger = new Logger(UpcomingExposService.name);
  private readonly dataDir = path.resolve(process.cwd(), "data");
  private readonly filePath = path.join(this.dataDir, "upcoming-expos.json");
  private items: UpcomingExpoItem[] = [];

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
        this.items = DEFAULT_UPCOMING_EXPOS;
        this.saveToFile();
      }
    } catch (e) {
      this.logger.error("Failed to load upcoming expos data", e);
    }
  }

  private saveToFile() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.items, null, 2));
    } catch (e) {
      this.logger.error("Failed to save upcoming expos data", e);
    }
  }

  findAll(): UpcomingExpoItem[] {
    this.ensureDataFile();
    return this.items;
  }

  findById(id: string): UpcomingExpoItem | undefined {
    this.ensureDataFile();
    return this.items.find((item) => item.id === id);
  }

  create(dto: CreateUpcomingExpoDto): UpcomingExpoItem {
    this.ensureDataFile();
    const newItem: UpcomingExpoItem = {
      id: `expo_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: dto.name,
      sector: dto.sector,
      date: dto.date,
      time: dto.time,
      place: dto.place,
      city: dto.city,
      status: dto.status || "Booking Open",
      edition: dto.edition || "",
      websiteUrl: dto.websiteUrl || "",
      createdAt: new Date().toISOString(),
    };

    this.items.unshift(newItem);
    this.saveToFile();
    this.logger.log(`Added new upcoming expo: ${newItem.name}`);
    return newItem;
  }

  update(id: string, dto: UpdateUpcomingExpoDto): UpcomingExpoItem | null {
    this.ensureDataFile();
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) return null;

    this.items[index] = {
      ...this.items[index],
      ...dto,
    };
    this.saveToFile();
    this.logger.log(`Updated upcoming expo: ${id}`);
    return this.items[index];
  }

  delete(id: string): boolean {
    this.ensureDataFile();
    const initialLen = this.items.length;
    this.items = this.items.filter((item) => item.id !== id);
    if (this.items.length !== initialLen) {
      this.saveToFile();
      this.logger.log(`Deleted upcoming expo: ${id}`);
      return true;
    }
    return false;
  }
}

