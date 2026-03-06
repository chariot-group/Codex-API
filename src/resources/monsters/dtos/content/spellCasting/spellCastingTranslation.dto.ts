import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class SpellcastingTranslationDto {

  @ApiProperty({ example: 'Wizard' })
  @IsOptional()
  @IsString()
  className?: string;

  @ApiProperty({ example: "Intelligence", required: false, description: "Spellcasting ability" })
  @IsOptional()
  @IsString()
  ability?: string;
}