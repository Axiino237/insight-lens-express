import { IsNotEmpty, IsString, IsOptional, IsArray } from "class-validator";

export class CreateCompletedWorkDto {
  @IsNotEmpty({ message: "Stall / Project Name is required" })
  @IsString()
  name: string;

  @IsNotEmpty({ message: "Client or Brand name is required" })
  @IsString()
  client: string;

  @IsNotEmpty({ message: "Place or Venue is required" })
  @IsString()
  place: string;

  @IsNotEmpty({ message: "Date is required" })
  @IsString()
  date: string;

  @IsNotEmpty({ message: "Time or Duration is required" })
  @IsString()
  time: string;

  @IsNotEmpty({ message: "Stall Size is required" })
  @IsString()
  size: string;

  @IsNotEmpty({ message: "Stall Type / Format is required" })
  @IsString()
  stallType: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @IsOptional()
  @IsString()
  description?: string;
}
