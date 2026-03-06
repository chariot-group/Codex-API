import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class SavingThrowsDto {
  @ApiProperty({ example: -1, default: 0, description: "Strength saving throw modifier" })
  @IsOptional()
  @IsNumber()
  strength?: number;

  @ApiProperty({ example: 2, default: 0, description: "Dexterity saving throw modifier" })
  @IsOptional()
  @IsNumber()
  dexterity?: number;

  @ApiProperty({ example: 0, default: 0, description: "Constitution saving throw modifier" })
  @IsOptional()
  @IsNumber()
  constitution?: number;

  @ApiProperty({ example: 6, default: 0, description: "Intelligence saving throw modifier (proficient)" })
  @IsOptional()
  @IsNumber()
  intelligence?: number;

  @ApiProperty({ example: 4, default: 0, description: "Wisdom saving throw modifier (proficient)" })
  @IsOptional()
  @IsNumber()
  wisdom?: number;

  @ApiProperty({ example: 0, default: 0, description: "Charisma saving throw modifier" })
  @IsOptional()
  @IsNumber()
  charisma?: number;
}