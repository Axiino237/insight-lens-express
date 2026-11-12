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
import { CompletedWorksService } from "./completed-works.service";
import { CreateCompletedWorkDto } from "./dto/create-completed-work.dto";
import { UpdateCompletedWorkDto } from "./dto/update-completed-work.dto";

@Controller("completed-works")
export class CompletedWorksController {
  constructor(private readonly service: CompletedWorksService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    const item = this.service.findById(id);
    if (!item) {
      throw new NotFoundException(`Completed work with ID ${id} not found`);
    }
    return item;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateCompletedWorkDto) {
    return this.service.create(dto);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateCompletedWorkDto) {
    const updated = this.service.update(id, dto);
    if (!updated) {
      throw new NotFoundException(`Completed work with ID ${id} not found`);
    }
    return updated;
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  remove(@Param("id") id: string) {
    const deleted = this.service.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Completed work with ID ${id} not found`);
    }
    return { success: true, message: `Completed work ${id} deleted` };
  }
}

