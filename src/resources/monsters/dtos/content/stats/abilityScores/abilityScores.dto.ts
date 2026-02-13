import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class AbilityScoresDto {
  @ApiProperty({ example: 9, default: 10, description: "Strength score" })
  @IsOptional()
  @IsNumber()
  strength?: number;

  @ApiProperty({ example: 14, default: 10, description: "Dexterity score" })
  @IsOptional()
  @IsNumber()
  dexterity?: number;

  @ApiProperty({ example: 11, default: 10, description: "Constitution score" })
  @IsOptional()
  @IsNumber()
  constitution?: number;

  @ApiProperty({ example: 17, default: 10, description: "Intelligence score (primary for Mage)" })
  @IsOptional()
  @IsNumber()
  intelligence?: number;

  @ApiProperty({ example: 12, default: 10, description: "Wisdom score" })
  @IsOptional()
  @IsNumber()
  wisdom?: number;

  @ApiProperty({ example: 11, default: 10, description: "Charisma score" })
  @IsOptional()
  @IsNumber()
  charisma?: number;
}