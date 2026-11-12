import { Controller, Post, Get, Body, Param, NotFoundException } from "@nestjs/common";
import { ContactService } from "./contact.service";
import { CreateContactDto } from "./dto/create-contact.dto";

@Controller("contact")
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async submitBrief(@Body() dto: CreateContactDto) {
    return this.contactService.create(dto);
  }

  @Get()
  async listInquiries() {
    return this.contactService.findAll();
  }

  @Get(":id")
  async getInquiry(@Param("id") id: string) {
    const inquiry = await this.contactService.findById(id);
    if (!inquiry) {
      throw new NotFoundException(`Inquiry with ID ${id} not found`);
    }
    return inquiry;
  }
}

