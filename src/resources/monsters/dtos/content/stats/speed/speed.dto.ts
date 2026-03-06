import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class SpeedDto {
  @ApiProperty({ example: 30, required: false })
  @IsOptional()
  @IsNumber()
  walk?: number;

  @ApiProperty({ example: 20, required: false })
  @IsOptional()
  @IsNumber()
  climb?: number;

  @ApiProperty({ example: 15, required: false })
  @IsOptional()
  @IsNumber()
  swim?: number;

  @ApiProperty({ example: 60, required: false })
  @IsOptional()
  @IsNumber()
  fly?: number;

  @ApiProperty({ example: 10, required: false })
  @IsOptional()
  @IsNumber()
  burrow?: number;
}