import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { Type } from "class-transformer";

export class CreateTestimonialDto {
  @IsString()
  @IsNotEmpty({ message: "Name is required" })
  name: string;

  @Type(() => Number)
  @IsNumber()
  @Min(1, { message: "Stars must be between 1 and 5" })
  @Max(5, { message: "Stars must be between 1 and 5" })
  stars: number;

  @IsString()
  @IsOptional()
  companyName?: string;

  @IsString()
  @IsOptional()
  photo?: string;

  @IsString()
  @IsNotEmpty({ message: "Message is required" })
  message: string;
}

