import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AppearanceTranslationDto {

  @ApiProperty({ example: 'Blue' })
  @IsOptional()
  @IsString()
  eyes?: string;

  @ApiProperty({ example: 'Light' })
  @IsOptional()
  @IsString()
  skin?: string;

  @ApiProperty({ example: 'Brown' })
  @IsOptional()
  @IsString()
  hair?: string;

  @ApiProperty({ example: 'Athletic build with a friendly face.' })
  @IsOptional()
  @IsString()
  description?: string;
}
