import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator";
import {
  StatsTranslationDto,
  AbilityTranslationDto,
  ActionsTranslationDto,
  ProfileTranslationDto,
} from "@/resources/monsters/dtos/create-monster-translation.dto";

/**
 * DTO for updating an existing monster translation
 * All fields are optional (partial update)
 * The 'srd' field is intentionally excluded - cannot be modified via this endpoint
 *
 * IMPORTANT: Only textual fields can be modified in a translation.
 * Numeric values (stats, challenge, affinities, spellcasting, etc.)
 * are copied from the original translation and cannot be changed.
 */
export class UpdateMonsterTranslationDto {
  @ApiPropertyOptional({ example: "Gobelin", description: "Name of the monster (translated)" })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    type: StatsTranslationDto,
    description: "Translation for stats (only languages can be modified)",
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => StatsTranslationDto)
  stats?: StatsTranslationDto;

  @ApiPropertyOptional({
    type: [AbilityTranslationDto],
    description: "Translated abilities (name and description only)",
    example: [
      {
        name: "Ascendance féerique",
        description: "La créature a l'avantage aux jets de sauvegarde contre les effets de charme.",
      },
    ],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AbilityTranslationDto)
  abilities?: AbilityTranslationDto[];

  @ApiPropertyOptional({
    type: ActionsTranslationDto,
    description: "Translated actions (name and description only, numeric values cannot be changed)",
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ActionsTranslationDto)
  actions?: ActionsTranslationDto;

  @ApiPropertyOptional({
    type: ProfileTranslationDto,
    description: "Translated profile (type, subtype, alignment)",
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProfileTranslationDto)
  profile?: ProfileTranslationDto;
}
