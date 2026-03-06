import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class ProfileTranslationDto {
  @ApiProperty({ example: "humanoid", required: false })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({ example: "goblinoid", required: false })
  @IsOptional()
  @IsString()
  subtype?: string;
}