import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { UpcomingExposService } from "./upcoming-expos.service";
import { CreateUpcomingExpoDto } from "./dto/create-upcoming-expo.dto";
import { UpdateUpcomingExpoDto } from "./dto/update-upcoming-expo.dto";

@Controller("upcoming-expos")
export class UpcomingExposController {
  constructor(private readonly service: UpcomingExposService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    const item = this.service.findById(id);
    if (!item) {
      throw new NotFoundException(`Upcoming expo with ID ${id} not found`);
    }
    return item;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateUpcomingExpoDto) {
    return this.service.create(dto);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateUpcomingExpoDto) {
    const updated = this.service.update(id, dto);
    if (!updated) {
      throw new NotFoundException(`Upcoming expo with ID ${id} not found`);
    }
    return updated;
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  remove(@Param("id") id: string) {
    const deleted = this.service.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Upcoming expo with ID ${id} not found`);
    }
    return { success: true, message: `Upcoming expo ${id} deleted` };
  }
}

