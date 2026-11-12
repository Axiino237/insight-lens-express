import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateContactDto {
  @IsString()
  @IsNotEmpty({ message: "Name is required" })
  name: string;

  @IsEmail({}, { message: "Valid email is required" })
  @IsNotEmpty({ message: "Email is required" })
  email: string;

  @IsString()
  @IsOptional()
  company?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  service?: string;

  @IsString()
  @IsOptional()
  message?: string;
}

