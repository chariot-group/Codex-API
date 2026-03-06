import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString } from "class-validator";

export class AffinitiesTranslationDto {
  @ApiProperty({ type: [String], example: ["fire", "cold"], default: [] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  resistances?: string[];

  @ApiProperty({ type: [String], example: ["poison", "psychic"], default: [] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  immunities?: string[];

  @ApiProperty({ type: [String], example: ["lightning"], default: [] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  vulnerabilities?: string[];
}