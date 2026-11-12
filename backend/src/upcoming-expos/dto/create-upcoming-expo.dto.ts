import { IsNotEmpty, IsString, IsOptional } from "class-validator";

export class CreateUpcomingExpoDto {
  @IsNotEmpty({ message: "Expo name is required" })
  @IsString()
  name: string;

  @IsNotEmpty({ message: "Sector / Industry is required" })
  @IsString()
  sector: string;

  @IsNotEmpty({ message: "Date is required" })
  @IsString()
  date: string;

  @IsNotEmpty({ message: "Time / Timings is required" })
  @IsString()
  time: string;

  @IsNotEmpty({ message: "Place / Venue is required" })
  @IsString()
  place: string;

  @IsNotEmpty({ message: "City is required" })
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  edition?: string;

  @IsOptional()
  @IsString()
  websiteUrl?: string;
}

