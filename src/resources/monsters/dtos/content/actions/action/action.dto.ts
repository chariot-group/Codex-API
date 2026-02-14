import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DamageDto } from '@/resources/monsters/dtos/content/actions/action/damage.dto';
import { DifficultyClassDto } from '@/resources/monsters/dtos/content/actions/action/dificultyClass.dto';

export class ActionDto {

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

  @ApiProperty({ example: 5 })
  @IsOptional()
  @IsNumber()
  attackBonus?: number;

  @ApiProperty({ type: [DamageDto] })
  @ValidateNested({ each: true })
  @IsArray()
  @IsOptional()
  @Type(() => DamageDto)
  damage?: DamageDto[];

  @ApiProperty({ example: '30 feet' })
  @IsOptional()
  @IsString()
  range?: string;

  @ApiProperty({ type: DifficultyClassDto })
  @ValidateNested()
  @IsOptional()
  @Type(() => DifficultyClassDto)
  dc?: DifficultyClassDto;

  @ApiProperty({ example: 2, description: 'Cost of the action (for legendary actions)' })
  @IsOptional()
  @IsNumber()
  cost?: number;
}
