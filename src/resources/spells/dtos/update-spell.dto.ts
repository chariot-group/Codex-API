import { PartialType } from "@nestjs/mapped-types";
import { CreateSpellDto } from "@/resources/spells/dtos/create-spell.dto";
import { IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateSpellDto extends PartialType(CreateSpellDto) {

    @ApiProperty({ example: 1, description: "0: Homebrew, 1: Certified by Chariot", maximum: 1, minimum: 0 })
    @IsNumber({ maxDecimalPlaces: 0 })
    tag: 0 | 1;
}
