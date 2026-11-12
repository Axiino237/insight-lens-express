import { Module } from "@nestjs/common";
import { CompletedWorksController } from "./completed-works.controller";
import { CompletedWorksService } from "./completed-works.service";

@Module({
  controllers: [CompletedWorksController],
  providers: [CompletedWorksService],
  exports: [CompletedWorksService],
})
export class CompletedWorksModule {}

