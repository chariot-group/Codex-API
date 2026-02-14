import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString, ValidateNested } from "class-validator";
import { SenseTranslationDto } from "@/resources/monsters/dtos/content/stats/sens/sensTranslation.dto";

export class StatsTranslationDto {

  @ApiProperty({ example: ['Common', 'Elvish'] })
  @IsOptional()
  @IsString({ each: true })
  languages?: string[];

  @ApiProperty({ type: [SenseTranslationDto], default: [] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SenseTranslationDto)
  senses?: SenseTranslationDto[];
}