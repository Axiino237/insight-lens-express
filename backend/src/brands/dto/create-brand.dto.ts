import { IsNotEmpty, IsString } from "class-validator";

export class CreateBrandDto {
  @IsNotEmpty({ message: "Image is required" })
  @IsString()
  image: string;
}
