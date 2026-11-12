import { IsNotEmpty, IsString, IsOptional } from "class-validator";

export class UpdateStallComparisonDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  subtitle?: string;

  @IsOptional()
  @IsString()
  client?: string;

  @IsOptional()
  @IsString()
  venue?: string;

  @IsNotEmpty({ message: "3D Render image is required" })
  @IsString()
  renderImage: string;

  @IsNotEmpty({ message: "Executed stall image is required" })
  @IsString()
  executedImage: string;
}

