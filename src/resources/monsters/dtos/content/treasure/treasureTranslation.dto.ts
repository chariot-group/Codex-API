import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class TreasureTranslationDto {

  @ApiProperty({ example: 'Found in a hidden chest behind the waterfall.' })
  @IsOptional()
  @IsString()
  treasure?: string;

  @ApiProperty({ example: 'Sword, shield, and leather armor.' })
  @IsOptional()
  @IsString()
  equipment?: string;
}
