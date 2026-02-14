import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator";
import { StatsTranslationDto } from "@/resources/monsters/dtos/content/stats/statsTranslation.dto";
import { AffinitiesTranslationDto } from "@/resources/monsters/dtos/content/affinities/affinitiesTranslation.dto";
import { AbilityTranslationDto } from "@/resources/monsters/dtos/content/ability/abilityTranslation.dto";
import { SpellcastingTranslationDto } from "@/resources/monsters/dtos/content/spellCasting/spellCastingTranslation.dto";
import { ActionsTranslationDto } from "@/resources/monsters/dtos/content/actions/actionsTranslation.dto";
import { ProfileTranslationDto } from "@/resources/monsters/dtos/content/profile/profilTranslation.dto";
import { AppearanceTranslationDto } from "@/resources/monsters/dtos/content/appearance/appearanceTranslation.dto";
import { BackgroundTranslationDto } from "@/resources/monsters/dtos/content/background/backgroundTranslation.dto";
import { TreasureTranslationDto } from "@/resources/monsters/dtos/content/treasure/treasureTranslation.dto";

export class MonsterTranslationDto {
  
  @ApiProperty({ example: 'Aragorn' })
  @IsString()
  firstname: string;

  @ApiProperty({ example: 'Elessar' })
  @IsOptional()
  @IsString()
  lastname?: string;

  @ApiProperty({ example: 'Fils d\'Arathorn' })
  @IsOptional()
  @IsString()
  surname?: string;

  @ApiProperty({ type: StatsTranslationDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => StatsTranslationDto)
  stats?: StatsTranslationDto;

  @ApiProperty({ type: AffinitiesTranslationDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => AffinitiesTranslationDto)
  affinities?: AffinitiesTranslationDto;

  @ApiProperty({
    type: [AbilityTranslationDto],
    default: [],
    example: [
      {
        name: "Fey Ancestry",
        description:
          "The creature has advantage on saving throws against being charmed, and magic can't put it to sleep.",
      },
      {
        name: "Innate Spellcasting",
        description:
          "The creature's innate spellcasting ability is Charisma (spell save DC 12). It can innately cast the following spells, requiring no material components: At will: dancing lights, 1/day each: darkness, faerie fire.",
      },
    ],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AbilityTranslationDto)
  abilities?: AbilityTranslationDto[];

  @ApiProperty({
    type: [SpellcastingTranslationDto],
    default: [],
    example: [
      {
        ability: "Intelligence",
        saveDC: 14,
        attackBonus: 6,
        spellSlotsByLevel: {
          "1": { total: 4, used: 1 },
          "2": { total: 3, used: 0 },
          "3": { total: 3, used: 1 },
          "4": { total: 3, used: 0 },
          "5": { total: 1, used: 0 },
        },
        totalSlots: 14,
        spells: ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439012"],
      },
    ],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SpellcastingTranslationDto)
  spellcasting?: SpellcastingTranslationDto[];

  @ApiProperty({ type: AppearanceTranslationDto })
  @ValidateNested()
  @IsOptional()
  @Type(() => AppearanceTranslationDto)
  appearance: AppearanceTranslationDto;

  @ApiProperty({ type: BackgroundTranslationDto })
  @ValidateNested()
  @IsOptional()
  @Type(() => BackgroundTranslationDto)
  background: BackgroundTranslationDto;

  @ApiProperty({ type: TreasureTranslationDto })
  @ValidateNested()
  @IsOptional()
  @Type(() => TreasureTranslationDto)
  treasure: TreasureTranslationDto;

  @ApiProperty({ type: ActionsTranslationDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => ActionsTranslationDto)
  actions?: ActionsTranslationDto;

  @ApiProperty({ type: ProfileTranslationDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProfileTranslationDto)
  profile?: ProfileTranslationDto;
}