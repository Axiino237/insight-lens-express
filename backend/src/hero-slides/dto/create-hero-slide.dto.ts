import { IsNotEmpty, IsString, IsOptional } from "class-validator";

export class CreateHeroSlideDto {
  @IsNotEmpty({ message: "Title is required" })
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  subtitle?: string;

  @IsOptional()
  @IsString()
  tag?: string;

  @IsOptional()
  @IsString()
  badge?: string;

  @IsOptional()
  @IsString()
  desc?: string;

  @IsOptional()
  @IsString()
  footprint?: string;

  @IsOptional()
  @IsString()
  structure?: string;

  @IsOptional()
  @IsString()
  format?: string;

  @IsNotEmpty({ message: "Image is required" })
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  accent?: string;
}

