import { Module } from "@nestjs/common";
import { UpcomingExposController } from "./upcoming-expos.controller";
import { UpcomingExposService } from "./upcoming-expos.service";

@Module({
  controllers: [UpcomingExposController],
  providers: [UpcomingExposService],
  exports: [UpcomingExposService],
})
export class UpcomingExposModule {}

