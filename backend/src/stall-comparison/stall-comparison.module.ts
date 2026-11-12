import { Module } from "@nestjs/common";
import { StallComparisonController } from "./stall-comparison.controller";
import { StallComparisonService } from "./stall-comparison.service";

@Module({
  controllers: [StallComparisonController],
  providers: [StallComparisonService],
  exports: [StallComparisonService],
})
export class StallComparisonModule {}

