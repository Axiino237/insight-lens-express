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
import { HeroSlidesService, HeroSlide } from "./hero-slides.service";
import { CreateHeroSlideDto } from "./dto/create-hero-slide.dto";
import { UpdateHeroSlideDto } from "./dto/update-hero-slide.dto";

@Controller("hero-slides")
export class HeroSlidesController {
  constructor(private readonly heroSlidesService: HeroSlidesService) {}

  @Get()
  findAll(): HeroSlide[] {
    return this.heroSlidesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): HeroSlide {
    const slide = this.heroSlidesService.findById(id);
    if (!slide) {
      throw new NotFoundException(`Hero slide with id "${id}" not found`);
    }
    return slide;
  }

  @Post()
  create(@Body() dto: CreateHeroSlideDto): HeroSlide {
    return this.heroSlidesService.create(dto);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateHeroSlideDto): HeroSlide {
    const updated = this.heroSlidesService.update(id, dto);
    if (!updated) {
      throw new NotFoundException(`Hero slide with id "${id}" not found`);
    }
    return updated;
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  delete(@Param("id") id: string): { success: boolean; message: string } {
    const deleted = this.heroSlidesService.delete(id);
    if (!deleted) {
      throw new NotFoundException(`Hero slide with id "${id}" not found`);
    }
    return { success: true, message: `Hero slide ${id} deleted successfully` };
  }
}

