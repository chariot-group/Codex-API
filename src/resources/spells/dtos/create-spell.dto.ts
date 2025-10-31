import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { CreateSpellContentDto } from "@/resources/spells/dtos/create-spell-content.dto";
import { IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

@ApiExtraModels(CreateSpellContentDto)
export class CreateSpellDto {

    @ApiProperty({ example: "en" })
    @IsString()
    lang: string;

    @ApiProperty()
    @ValidateNested()
    @Type(() => CreateSpellContentDto)
    spellContent: CreateSpellContentDto;
}
