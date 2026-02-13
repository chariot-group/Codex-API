import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, Matches, ValidateNested } from "class-validator";
import { MonsterDto } from "./content/monster.dto";

export class CreateMonsterDto {
  @ApiProperty({ example: "en" })
  @IsString()
  @Matches(/^[a-z]{2}$/, {
    message: "lang must be a 2-letter ISO code in lowercase (e.g., fr, en, es).",
  })
  lang: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => MonsterDto)
  monsterContent: MonsterDto;
}
