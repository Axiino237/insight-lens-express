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
import { ShowcaseService, ShowcaseItem } from "./showcase.service";
import { CreateShowcaseDto } from "./dto/create-showcase.dto";
import { UpdateShowcaseDto } from "./dto/update-showcase.dto";

@Controller("showcase")
export class ShowcaseController {
  constructor(private readonly showcaseService: ShowcaseService) {}

  @Get()
  findAll(): ShowcaseItem[] {
    return this.showcaseService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): ShowcaseItem {
    const item = this.showcaseService.findById(id);
    if (!item) {
      throw new NotFoundException(`Showcase item with id "${id}" not found`);
    }
    return item;
  }

  @Post()
  create(@Body() dto: CreateShowcaseDto): ShowcaseItem {
    return this.showcaseService.create(dto);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateShowcaseDto): ShowcaseItem {
    const updated = this.showcaseService.update(id, dto);
    if (!updated) {
      throw new NotFoundException(`Showcase item with id "${id}" not found`);
    }
    return updated;
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  delete(@Param("id") id: string): { success: boolean; message: string } {
    const deleted = this.showcaseService.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Showcase item with id "${id}" not found`);
    }
    return { success: true, message: `Showcase item ${id} deleted successfully` };
  }
}

