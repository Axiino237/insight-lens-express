import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ContactModule } from "./contact/contact.module";
import { ServicesModule } from "./services/services.module";
import { ProjectsModule } from "./projects/projects.module";
import { VisitorModule } from "./visitor/visitor.module";
import { HealthModule } from "./health/health.module";
import { TestimonialsModule } from "./testimonials/testimonials.module";
import { ShowcaseModule } from "./showcase/showcase.module";
import { HeroSlidesModule } from "./hero-slides/hero-slides.module";
import { BrandsModule } from "./brands/brands.module";
import { CompletedWorksModule } from "./completed-works/completed-works.module";
import { UpcomingExposModule } from "./upcoming-expos/upcoming-expos.module";
import { StallComparisonModule } from "./stall-comparison/stall-comparison.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ContactModule,
    ServicesModule,
    ProjectsModule,
    VisitorModule,
    HealthModule,
    TestimonialsModule,
    ShowcaseModule,
    HeroSlidesModule,
    BrandsModule,
    CompletedWorksModule,
    UpcomingExposModule,
    StallComparisonModule,
  ],
})
export class AppModule {}

