import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DifficultyClassTranslationDto {

  @ApiProperty({ example: 'wis', description: 'Ability score type for the saving throw' })
  @IsOptional()
  @IsString()
  dcType?: string;

  @ApiProperty({ example: 'none', description: 'Effect on successful save' })
  @IsOptional()
  @IsString()
  successType?: string;
}
