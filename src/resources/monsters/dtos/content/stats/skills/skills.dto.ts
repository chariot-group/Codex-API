import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class SkillsDto {
  @ApiProperty({ example: 3, default: 0 })
  @IsOptional()
  @IsNumber()
  athletics?: number;

  @ApiProperty({ example: 2, default: 0 })
  @IsOptional()
  @IsNumber()
  acrobatics?: number;

  @ApiProperty({ example: 3, default: 0 })
  @IsOptional()
  @IsNumber()
  sleightHand?: number;

  @ApiProperty({ example: -1, default: 0 })
  @IsOptional()
  @IsNumber()
  stealth?: number;

  @ApiProperty({ example: 6, default: 0, description: "Arcana skill (proficient for Mage)" })
  @IsOptional()
  @IsNumber()
  arcana?: number;

  @ApiProperty({ example: 6, default: 0, description: "History skill (proficient for Mage)" })
  @IsOptional()
  @IsNumber()
  history?: number;

  @ApiProperty({ example: 2, default: 0 })
  @IsOptional()
  @IsNumber()
  investigation?: number;

  @ApiProperty({ example: 0, default: 0 })
  @IsOptional()
  @IsNumber()
  nature?: number;

  @ApiProperty({ example: 7, default: 0 })
  @IsOptional()
  @IsNumber()
  religion?: number;

  @ApiProperty({ example: 3, default: 0 })
  @IsOptional()
  @IsNumber()
  animalHandling?: number;

  @ApiProperty({ example: -1, default: 0 })
  @IsOptional()
  @IsNumber()
  insight?: number;

  @ApiProperty({ example: 1, default: 0 })
  @IsOptional()
  @IsNumber()
  medicine?: number;

  @ApiProperty({ example: 7, default: 0 })
  @IsOptional()
  @IsNumber()
  perception?: number;

  @ApiProperty({ example: 2, default: 0 })
  @IsOptional()
  @IsNumber()
  survival?: number;

  @ApiProperty({ example: 2, default: 0 })
  @IsOptional()
  @IsNumber()
  deception?: number;

  @ApiProperty({ example: 2, default: 0 })
  @IsOptional()
  @IsNumber()
  intimidation?: number;

  @ApiProperty({ example: 1, default: 0 })
  @IsOptional()
  @IsNumber()
  performance?: number;

  @ApiProperty({ example: 2, default: 0 })
  @IsOptional()
  @IsNumber()
  persuasion?: number;
}