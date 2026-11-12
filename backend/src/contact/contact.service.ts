import { Injectable, Logger } from "@nestjs/common";
import { CreateContactDto } from "./dto/create-contact.dto";
import * as fs from "fs";
import * as path from "path";

export interface ContactInquiry extends CreateContactDto {
  id: string;
  createdAt: string;
  status: "new" | "reviewed" | "contacted";
}

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);
  private readonly dataDir = path.resolve(process.cwd(), "data");
  private readonly filePath = path.join(this.dataDir, "inquiries.json");
  private inquiries: ContactInquiry[] = [];

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
        this.inquiries = JSON.parse(raw);
      } else {
        fs.writeFileSync(this.filePath, JSON.stringify([], null, 2));
      }
    } catch (err) {
      this.logger.error("Failed to load inquiries data file", err);
      this.inquiries = [];
    }
  }

  private persistToFile() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.inquiries, null, 2));
    } catch (err) {
      this.logger.error("Failed to persist inquiry to file", err);
    }
  }

  async create(dto: CreateContactDto): Promise<{ success: boolean; id: string; message: string }> {
    const inquiry: ContactInquiry = {
      ...dto,
      id: `inq_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
      status: "new",
    };

    this.inquiries.unshift(inquiry);
    this.persistToFile();

    this.logger.log(`New contact inquiry received from ${dto.name} (${dto.email}) - Service: ${dto.service || "N/A"}`);
    return {
      success: true,
      id: inquiry.id,
      message: "Brief received successfully. A producer will reach out within 24 hours.",
    };
  }

  async findAll(): Promise<ContactInquiry[]> {
    return this.inquiries;
  }

  async findById(id: string): Promise<ContactInquiry | null> {
    return this.inquiries.find((item) => item.id === id) || null;
  }
}

