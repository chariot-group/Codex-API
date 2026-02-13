import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class SpellcastingDto {

  @ApiProperty({ example: 'Wizard' })
  @IsOptional()
  @IsString()
  className?: string;

  @ApiProperty({ example: "Intelligence", required: false, description: "Spellcasting ability" })
  @IsOptional()
  @IsString()
  ability?: string;

  @ApiProperty({ example: 14, required: false, description: "Spell save DC" })
  @IsOptional()
  @IsNumber()
  saveDC?: number;

  @ApiProperty({ example: 6, description: "Spell attack bonus" })
  @IsOptional()
  @IsNumber()
  attackBonus?: number;

  @ApiProperty({
    example: {
      "1": { total: 4, used: 1 },
      "2": { total: 3, used: 0 },
      "3": { total: 3, used: 1 },
      "4": { total: 3, used: 0 },
      "5": { total: 1, used: 0 },
    },
    required: false,
    description: "Spell slots by level (will be converted to Map internally)",
  })
  @IsOptional()
  spellSlotsByLevel?: Map<number, { total?: number; used?: number }>;

  @ApiProperty({ example: 14, default: 0, description: "Total spell slots available" })
  @IsOptional()
  @IsNumber()
  totalSlots?: number;

  @ApiProperty({
    type: [String],
    example: [
      "fire-bolt",
      "mage-armor",
      "magic-missile",
      "shield",
      "misty-step",
      "counterspell",
      "fireball",
      "greater-invisibility",
      "cone-of-cold",
    ],
    default: [],
    description: "Array of spell IDs or references",
  })
  @IsOptional()
  @IsArray()
  spells?: any[]; // Référence vers des Spell IDs
}