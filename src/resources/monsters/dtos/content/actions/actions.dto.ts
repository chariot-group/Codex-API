import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsOptional, ValidateNested } from "class-validator";
import { ActionDto } from "./action/action.dto";

export class ActionsDto {
  @ApiProperty({
    type: [ActionDto],
    default: [],
    example: [
      {
        name: "Dagger",
        type: "melee",
        attackBonus: 5,
        damage: { dice: "1d4+2", type: "piercing" },
        range: "5 ft. or range 20/60 ft.",
        description:
          "Melee or Ranged Weapon Attack: +5 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 4 (1d4 + 2) piercing damage.",
      },
    ],
    description: "Standard actions available to the creature",
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ActionDto)
  standard?: ActionDto[];

  @ApiProperty({ type: [ActionDto], default: [] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ActionDto)
  legendary?: ActionDto[];

  @ApiProperty({ type: [ActionDto], default: [] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ActionDto)
  lair?: ActionDto[];
}