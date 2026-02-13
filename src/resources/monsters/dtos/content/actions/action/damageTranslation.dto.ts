import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class DamageTranslationDto {

  @ApiProperty({ example: 'fire' })
  @IsOptional()
  @IsString()
  type?: string;
}
