import { Controller, Get, Post } from "@nestjs/common";
import { VisitorService } from "./visitor.service";

@Controller("visitor-count")
export class VisitorController {
  constructor(private readonly visitorService: VisitorService) {}

  @Get()
  getCount() {
    return this.visitorService.getCount();
  }

  @Post("up")
  increment() {
    return this.visitorService.increment();
  }
}

