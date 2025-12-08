import { PartialType, OmitType } from "@nestjs/mapped-types";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  CreateMonsterContentDto,
  CreateStatsDto,
  CreateAffinitiesDto,
  CreateAbilityDto,
  CreateSpellcastingDto,
  CreateActionsDto,
  CreateChallengeDto,
  CreateProfileDto,
} from "@/resources/monsters/dtos/create-monster-content.dto";
import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator";

/**
 * DTO for updating an existing monster translation
 * All fields are optional (partial update)
 * The 'srd' field is intentionally excluded - cannot be modified via this endpoint
 */
export class UpdateMonsterTranslationDto {
  @ApiPropertyOptional({ example: "Gobelin", description: "Name of the monster" })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ type: CreateStatsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateStatsDto)
  stats?: CreateStatsDto;

  @ApiPropertyOptional({ type: CreateAffinitiesDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAffinitiesDto)
  affinities?: CreateAffinitiesDto;

  @ApiPropertyOptional({
    type: [CreateAbilityDto],
    example: [
      {
        name: "Fey Ancestry",
        description: "The creature has advantage on saving throws against being charmed.",
      },
    ],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAbilityDto)
  abilities?: CreateAbilityDto[];

  @ApiPropertyOptional({
    type: [CreateSpellcastingDto],
    example: [
      {
        ability: "Intelligence",
        saveDC: 14,
        attackBonus: 6,
        spells: ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439012"],
      },
    ],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSpellcastingDto)
  spellcasting?: CreateSpellcastingDto[];

  @ApiPropertyOptional({ type: CreateActionsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateActionsDto)
  actions?: CreateActionsDto;

  @ApiPropertyOptional({ type: CreateChallengeDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateChallengeDto)
  challenge?: CreateChallengeDto;

  @ApiPropertyOptional({ type: CreateProfileDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateProfileDto)
  profile?: CreateProfileDto;
}
