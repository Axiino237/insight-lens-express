import { Controller, Get, Param, NotFoundException } from "@nestjs/common";
import { ProjectsService } from "./projects.service";

@Controller("projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getAllProjects() {
    return this.projectsService.findAll();
  }

  @Get(":id")
  getProject(@Param("id") id: string) {
    const project = this.projectsService.findOne(id);
    if (!project) {
      throw new NotFoundException(`Project ${id} not found`);
    }
    return project;
  }
}

