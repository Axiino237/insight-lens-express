import { Controller, Get, Put, Body } from "@nestjs/common";
import { StallComparisonService } from "./stall-comparison.service";
import { UpdateStallComparisonDto } from "./dto/update-stall-comparison.dto";

@Controller("stall-comparison")
export class StallComparisonController {
  constructor(private readonly service: StallComparisonService) {}

  @Get()
  get() {
    return this.service.get();
  }

  @Put()
  update(@Body() dto: UpdateStallComparisonDto) {
    return this.service.update(dto);
  }
}

