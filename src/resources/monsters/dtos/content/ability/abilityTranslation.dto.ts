import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AbilityTranslationDto {
  @ApiProperty({ example: "Spellcasting", description: "Name of the special ability" })
  @IsString()
  name: string;

  @ApiProperty({
    example:
      "The mage is a 9th-level spellcaster. Its spellcasting ability is Intelligence (spell save DC 14, +6 to hit with spell attacks). The mage has the following wizard spells prepared: Cantrips (at will): fire bolt, light, mage hand, prestidigitation. 1st level (4 slots): detect magic, mage armor, magic missile, shield. 2nd level (3 slots): misty step, suggestion. 3rd level (3 slots): counterspell, fireball, fly. 4th level (3 slots): greater invisibility, ice storm. 5th level (1 slot): cone of cold.",
    description: "Description of the ability",
  })
  @IsString()
  description: string;
}