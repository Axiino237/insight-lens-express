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
import { BrandsService, BrandItem } from "./brands.service";
import { CreateBrandDto } from "./dto/create-brand.dto";
import { UpdateBrandDto } from "./dto/update-brand.dto";

@Controller("brands")
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get()
  findAll(): BrandItem[] {
    return this.brandsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): BrandItem {
    const brand = this.brandsService.findById(id);
    if (!brand) {
      throw new NotFoundException(`Brand logo with id "${id}" not found`);
    }
    return brand;
  }

  @Post()
  create(@Body() dto: CreateBrandDto): BrandItem {
    return this.brandsService.create(dto);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateBrandDto): BrandItem {
    const updated = this.brandsService.update(id, dto);
    if (!updated) {
      throw new NotFoundException(`Brand logo with id "${id}" not found`);
    }
    return updated;
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  delete(@Param("id") id: string): { success: boolean; message: string } {
    const deleted = this.brandsService.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Brand logo with id "${id}" not found`);
    }
    return { success: true, message: `Brand logo ${id} deleted successfully` };
  }
}
