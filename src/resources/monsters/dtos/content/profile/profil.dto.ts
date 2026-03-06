import { Alignment, ALIGNMENT } from "@/resources/monsters/constants/alignment.constant";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ProfileDto {
  @ApiProperty({ example: "humanoid", required: false })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({ example: "goblinoid", required: false })
  @IsOptional()
  @IsString()
  subtype?: string;

  @ApiProperty({ example: 'Lawful Good', enum: ALIGNMENT })
  @IsNotEmpty()
  @IsEnum(ALIGNMENT, { message: 'alignment must be a valid alignment' })
  alignment: Alignment;
}