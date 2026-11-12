import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from "@nestjs/common";
import { TestimonialsService } from "./testimonials.service";
import { CreateTestimonialDto } from "./dto/create-testimonial.dto";
import { UpdateTestimonialDto } from "./dto/update-testimonial.dto";

@Controller("testimonials")
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) { }

  @Get()
  getAllTestimonials() {
    return this.testimonialsService.findAll();
  }

  @Post()
  createTestimonial(@Body() dto: CreateTestimonialDto) {
    return this.testimonialsService.create(dto);
  }

  @Put(":id")
  updateTestimonial(@Param("id") id: string, @Body() dto: UpdateTestimonialDto) {
    const updated = this.testimonialsService.update(id, dto);
    if (!updated) {
      throw new NotFoundException(`Testimonial with ID ${id} not found`);
    }
    return updated;
  }

  @Delete(":id")
  deleteTestimonial(@Param("id") id: string) {
    const success = this.testimonialsService.delete(id);
    if (!success) {
      throw new NotFoundException(`Testimonial with ID ${id} not found`);
    }
    return { success: true, message: `Testimonial ${id} deleted successfully` };
  }
}

