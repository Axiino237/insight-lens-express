import { IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { Type } from "class-transformer";

export class UpdateTestimonialDto {
  @IsString()
  @IsOptional()
  name?: string;

  @Type(() => Number)
  @IsNumber()
  @Min(1, { message: "Stars must be between 1 and 5" })
  @Max(5, { message: "Stars must be between 1 and 5" })
  @IsOptional()
  stars?: number;

  @IsString()
  @IsOptional()
  companyName?: string;

  @IsString()
  @IsOptional()
  photo?: string;

  @IsString()
  @IsOptional()
  message?: string;
}

