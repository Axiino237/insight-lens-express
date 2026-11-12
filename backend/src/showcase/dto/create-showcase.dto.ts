import { IsNotEmpty, IsString, IsOptional } from "class-validator";

export class CreateShowcaseDto {
  @IsNotEmpty({ message: "Name is required" })
  @IsString()
  name: string;

  @IsNotEmpty({ message: "Classification is required" })
  @IsString()
  classification: string;

  @IsNotEmpty({ message: "Image is required" })
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  description?: string;
}

