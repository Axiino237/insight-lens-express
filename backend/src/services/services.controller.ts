import { Controller, Get, Param, NotFoundException } from "@nestjs/common";
import { ServicesService } from "./services.service";

@Controller("services")
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  getAllServices() {
    return this.servicesService.findAll();
  }

  @Get(":id")
  getService(@Param("id") id: string) {
    const service = this.servicesService.findOne(id);
    if (!service) {
      throw new NotFoundException(`Service ${id} not found`);
    }
    return service;
  }
}

