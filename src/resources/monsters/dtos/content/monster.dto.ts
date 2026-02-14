import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator";
import { StatsDto } from "@/resources/monsters/dtos/content/stats/stats.dto";
import { AffinitiesDto } from "@/resources/monsters/dtos/content/affinities/affinities.dto";
import { AbilityDto } from "@/resources/monsters/dtos/content/ability/ability.dto";
import { SpellcastingDto } from "@/resources/monsters/dtos/content/spellCasting/spellCasting.dto";
import { ActionsDto } from "@/resources/monsters/dtos/content/actions/actions.dto";
import { ProfileDto } from "@/resources/monsters/dtos/content/profile/profil.dto";
import { AppearanceDto } from "@/resources/monsters/dtos/content/appearance/appearance.dto";
import { BackgroundDto } from "@/resources/monsters/dtos/content/background/background.dto";
import { TreasureDto } from "@/resources/monsters/dtos/content/treasure/treasure.dto";
import { ConditionsDto } from "@/resources/monsters/dtos/content/conditions/conditions.dto";
import { ChallengeDto } from "@/resources/monsters/dtos/content/challenge/challenge.dto";

export class MonsterDto {
  
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

  @ApiProperty({ example: 'http://example.com/avatar.png' })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty({ type: StatsDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => StatsDto)
  stats?: StatsDto;

  @ApiProperty({ type: AffinitiesDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => AffinitiesDto)
  affinities?: AffinitiesDto;

  @ApiProperty({
    type: [AbilityDto],
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
  @Type(() => AbilityDto)
  abilities?: AbilityDto[];

  @ApiProperty({
    type: [SpellcastingDto],
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
  @Type(() => SpellcastingDto)
  spellcasting?: SpellcastingDto[];

  @ApiProperty({ type: AppearanceDto })
  @ValidateNested()
  @IsOptional()
  @Type(() => AppearanceDto)
  appearance: AppearanceDto;

  @ApiProperty({ type: BackgroundDto })
  @ValidateNested()
  @IsOptional()
  @Type(() => BackgroundDto)
  background: BackgroundDto;

  @ApiProperty({ type: TreasureDto })
  @ValidateNested()
  @IsOptional()
  @Type(() => TreasureDto)
  treasure: TreasureDto;

  @ApiProperty({ type: ConditionsDto })
  @ValidateNested()
  @IsOptional()
  @Type(() => ConditionsDto)
  conditions?: ConditionsDto;

  @ApiProperty({ type: ActionsDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => ActionsDto)
  actions?: ActionsDto;

  @ApiProperty({ type: ChallengeDto })
  @ValidateNested()
  @IsOptional()
  @Type(() => ChallengeDto)
  challenge: ChallengeDto;

  @ApiProperty({ type: ProfileDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProfileDto)
  profile?: ProfileDto;

  @ApiProperty({ example: '18d8+54', required: false })
  @IsString()
  @IsOptional()
  hitPointsRoll?: string;
}