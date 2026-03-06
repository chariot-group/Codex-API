import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class SenseDto {
  @ApiProperty({ example: "darkvision" })
  @IsString()
  name: string;

  @ApiProperty({ example: 60 })
  @IsNumber()
  value: number;
}