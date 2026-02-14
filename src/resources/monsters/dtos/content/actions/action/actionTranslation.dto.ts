import { Type } from 'class-transformer';
import {
  IsArray,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DamageTranslationDto } from '@/resources/monsters/dtos/content/actions/action/damageTranslation.dto';
import { DifficultyClassTranslationDto } from '@/resources/monsters/dtos/content/actions/action/dificultyClassTranslation.dto';

export class ActionTranslationDto {

  @ApiProperty({ example: 'Fireball' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'A ball of fire that explodes upon impact.' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({ example: 'The target must succeed on a DC 18 Constitution saving throw or be paralyzed for 1 minute.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: [DamageTranslationDto] })
  @ValidateNested({ each: true })
  @IsArray()
  @IsOptional()
  @Type(() => DamageTranslationDto)
  damage?: DamageTranslationDto[];

  @ApiProperty({ example: '30 feet' })
  @IsOptional()
  @IsString()
  range?: string;

  @ApiProperty({ type: DifficultyClassTranslationDto })
  @ValidateNested()
  @IsOptional()
  @Type(() => DifficultyClassTranslationDto)
  dc?: DifficultyClassTranslationDto;
}
