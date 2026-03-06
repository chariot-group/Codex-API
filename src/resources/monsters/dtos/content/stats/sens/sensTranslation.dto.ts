import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class SenseTranslationDto {
  @ApiProperty({ example: "darkvision" })
  @IsString()
  name: string;
}