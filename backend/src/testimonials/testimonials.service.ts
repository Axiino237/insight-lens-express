import { Injectable, Logger } from "@nestjs/common";
import { CreateTestimonialDto } from "./dto/create-testimonial.dto";
import * as fs from "fs";
import * as path from "path";

export interface Testimonial extends CreateTestimonialDto {
  id: string;
  createdAt: string;
}

@Injectable()
export class TestimonialsService {
  private readonly logger = new Logger(TestimonialsService.name);
  private readonly dataDir = path.resolve(process.cwd(), "data");
  private readonly filePath = path.join(this.dataDir, "testimonials.json");
  private testimonials: Testimonial[] = [];

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
        this.testimonials = JSON.parse(raw);
      } else {
        // Initial seed testimonial matching the current live site
        this.testimonials = [
          {
            id: "test_default_1",
            name: "Elangovan",
            stars: 5,
            companyName: "Revathi Equipment India Ltd.",
            photo: "",
            message:
              "The First Step Solutions didn't just build our exhibition stall — they designed an extraordinary brand experience that became the absolute highlight of the venue. Their attention to detail drove massive footfall and engagement.",
            createdAt: new Date().toISOString(),
          },
        ];
        this.saveToFile();
      }
    } catch (e) {
      this.logger.error("Failed to load testimonials", e);
    }
  }

  private saveToFile() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.testimonials, null, 2));
    } catch (e) {
      this.logger.error("Failed to save testimonials", e);
    }
  }

  findAll(): Testimonial[] {
    return this.testimonials;
  }

  findById(id: string): Testimonial | undefined {
    return this.testimonials.find((t) => t.id === id);
  }

  create(dto: CreateTestimonialDto): Testimonial {
    const newTestimonial: Testimonial = {
      ...dto,
      id: `test_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
    };

    this.testimonials.unshift(newTestimonial);
    this.saveToFile();
    this.logger.log(`New testimonial added for ${dto.name} (${dto.companyName || "No Company"})`);
    return newTestimonial;
  }

  update(id: string, dto: Partial<CreateTestimonialDto>): Testimonial | null {
    const index = this.testimonials.findIndex((t) => t.id === id);
    if (index === -1) return null;

    this.testimonials[index] = {
      ...this.testimonials[index],
      ...dto,
      id,
    };
    this.saveToFile();
    this.logger.log(`Updated testimonial with id: ${id}`);
    return this.testimonials[index];
  }

  delete(id: string): boolean {
    const initialLen = this.testimonials.length;
    this.testimonials = this.testimonials.filter((t) => t.id !== id);
    if (this.testimonials.length !== initialLen) {
      this.saveToFile();
      this.logger.log(`Deleted testimonial with id: ${id}`);
      return true;
    }
    return false;
  }
}

