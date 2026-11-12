import { Injectable, Logger } from "@nestjs/common";
import { UpdateStallComparisonDto } from "./dto/update-stall-comparison.dto";
import * as fs from "fs";
import * as path from "path";

export interface StallComparisonData {
  title: string;
  subtitle: string;
  client: string;
  venue: string;
  renderImage: string;
  executedImage: string;
  updatedAt: string;
}

const DEFAULT_COMPARISON: StallComparisonData = {
  title: "Precision Engineering Expo Pavilion",
  subtitle: "3D CAD Visualization vs. Physical On-Ground Fabrication",
  client: "Flagship Engineering Brand (Dummy Expo)",
  venue: "Chennai Trade Centre, Nandambakkam",
  renderImage: "default_render",
  executedImage: "default_executed",
  updatedAt: "2026-11-10T10:00:00.000Z",
};

@Injectable()
export class StallComparisonService {
  private readonly logger = new Logger(StallComparisonService.name);
  private readonly dataDir = path.resolve(process.cwd(), "data");
  private readonly filePath = path.join(this.dataDir, "stall-comparison.json");
  private data: StallComparisonData = DEFAULT_COMPARISON;

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
        this.data = JSON.parse(raw);
      } else {
        this.data = DEFAULT_COMPARISON;
        this.saveToFile();
      }
    } catch (e) {
      this.logger.error("Failed to load stall comparison data", e);
    }
  }

  private saveToFile() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2));
    } catch (e) {
      this.logger.error("Failed to save stall comparison data", e);
    }
  }

  get(): StallComparisonData {
    this.ensureDataFile();
    return this.data;
  }

  update(dto: UpdateStallComparisonDto): StallComparisonData {
    this.ensureDataFile();
    this.data = {
      title: dto.title || this.data.title,
      subtitle: dto.subtitle || this.data.subtitle,
      client: dto.client || this.data.client,
      venue: dto.venue || this.data.venue,
      renderImage: dto.renderImage || this.data.renderImage,
      executedImage: dto.executedImage || this.data.executedImage,
      updatedAt: new Date().toISOString(),
    };
    this.saveToFile();
    this.logger.log("Updated stall comparison data");
    return this.data;
  }
}

