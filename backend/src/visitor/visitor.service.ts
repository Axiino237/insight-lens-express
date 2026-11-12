import { Injectable, Logger } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class VisitorService {
  private readonly logger = new Logger(VisitorService.name);
  private readonly dataDir = path.resolve(process.cwd(), "data");
  private readonly filePath = path.join(this.dataDir, "visitor-count.json");
  private count = 35; // base starting count

  constructor() {
    this.loadCount();
  }

  private loadCount() {
    try {
      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, "utf-8");
        const parsed = JSON.parse(raw);
        if (typeof parsed.count === "number") {
          this.count = parsed.count;
        }
      } else {
        this.saveCount();
      }
    } catch (e) {
      this.logger.error("Error reading visitor count", e);
    }
  }

  private saveCount() {
    try {
      if (!fs.existsSync(this.dataDir)) {
        fs.mkdirSync(this.dataDir, { recursive: true });
      }
      fs.writeFileSync(this.filePath, JSON.stringify({ count: this.count }, null, 2));
    } catch (e) {
      this.logger.error("Error saving visitor count", e);
    }
  }

  getCount(): { count: number } {
    return { count: this.count };
  }

  increment(): { count: number } {
    this.count += 1;
    this.saveCount();
    return { count: this.count };
  }
}

