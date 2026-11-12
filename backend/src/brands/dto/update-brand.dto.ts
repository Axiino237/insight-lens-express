import { IsNotEmpty, IsString } from "class-validator";

export class UpdateBrandDto {
  @IsNotEmpty({ message: "Image is required" })
  @IsString()
  image: string;
}
