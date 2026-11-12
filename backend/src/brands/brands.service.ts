import { Injectable, Logger } from "@nestjs/common";
import { CreateBrandDto } from "./dto/create-brand.dto";
import { UpdateBrandDto } from "./dto/update-brand.dto";
import * as fs from "fs";
import * as path from "path";

export interface BrandItem {
  id: string;
  image: string;
  createdAt: string;
}

const DEFAULT_BRANDS: BrandItem[] = Array.from({ length: 25 }, (_, i) => ({
  id: `brand_${i + 1}`,
  image: `default_brand_${i + 1}`,
  createdAt: "2026-11-10T10:00:00.000Z",
}));

@Injectable()
export class BrandsService {
  private readonly logger = new Logger(BrandsService.name);
  private readonly dataDir = path.resolve(process.cwd(), "data");
  private readonly filePath = path.join(this.dataDir, "brands.json");
  private brands: BrandItem[] = [];

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
        this.brands = JSON.parse(raw);
      } else {
        this.brands = DEFAULT_BRANDS;
        this.saveToFile();
      }
    } catch (e) {
      this.logger.error("Failed to load brands data", e);
    }
  }

  private saveToFile() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.brands, null, 2));
    } catch (e) {
      this.logger.error("Failed to save brands data", e);
    }
  }

  findAll(): BrandItem[] {
    this.ensureDataFile();
    return this.brands;
  }

  findById(id: string): BrandItem | undefined {
    this.ensureDataFile();
    return this.brands.find((b) => b.id === id);
  }

  create(dto: CreateBrandDto): BrandItem {
    this.ensureDataFile();
    const newBrand: BrandItem = {
      id: `brand_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      image: dto.image,
      createdAt: new Date().toISOString(),
    };

    this.brands.push(newBrand);
    this.saveToFile();
    this.logger.log(`Added new brand logo: ${newBrand.id}`);
    return newBrand;
  }

  update(id: string, dto: UpdateBrandDto): BrandItem | null {
    this.ensureDataFile();
    const index = this.brands.findIndex((b) => b.id === id);
    if (index === -1) return null;

    this.brands[index] = {
      ...this.brands[index],
      image: dto.image,
    };
    this.saveToFile();
    this.logger.log(`Updated brand logo with id: ${id}`);
    return this.brands[index];
  }

  delete(id: string): boolean {
    this.ensureDataFile();
    const initialLen = this.brands.length;
    this.brands = this.brands.filter((b) => b.id !== id);
    if (this.brands.length !== initialLen) {
      this.saveToFile();
      this.logger.log(`Deleted brand logo with id: ${id}`);
      return true;
    }
    return false;
  }
}
