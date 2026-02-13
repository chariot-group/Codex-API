import { Size, SIZES } from "@/resources/monsters/constants/sizes.constant";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { AbilityScoresDto } from "./abilityScores/abilityScores.dto";
import { SavingThrowsDto } from "./savingThrows/savingThrows.dto";
import { SpeedDto } from "./speed/speed.dto";
import { SkillsDto } from "./skills/skills.dto";
import { SenseDto } from "./sens/sens.dto";

export class StatsDto {

  @ApiProperty({ example: 'Medium' })
  @IsNotEmpty()
  @IsEnum(SIZES, { message: 'size must be a valid size' })
  size: Size;

  @ApiProperty({ example: 40, default: 0, description: "Maximum hit points" })
  @IsOptional()
  @IsNumber()
  maxHitPoints?: number;

  @ApiProperty({ example: 40, required: false, description: "Current hit points, defaults to maxHitPoints" })
  @IsOptional()
  @IsNumber()
  currentHitPoints?: number;

  @ApiProperty({ example: 0, default: 0, description: "Temporary hit points" })
  @IsOptional()
  @IsNumber()
  tempHitPoints?: number;

  @ApiProperty({ example: 12, default: 10, description: "Armor Class (with Mage Armor: 15)" })
  @IsOptional()
  @IsNumber()
  armorClass?: number;

  @ApiProperty({ example: 3 })
  @IsOptional()
  @IsNumber()
  initiative?: number;

  @ApiProperty({ example: 12 })
  @IsOptional()
  @IsNumber()
  passivePerception?: number;

  @ApiProperty({ example: ['Common', 'Elvish'] })
  @IsOptional()
  @IsString({ each: true })
  languages?: string[];

  @ApiProperty({ type: AbilityScoresDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => AbilityScoresDto)
  abilityScores?: AbilityScoresDto;

  @ApiProperty({ type: SavingThrowsDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => SavingThrowsDto)
  savingThrows?: SavingThrowsDto;

  @ApiProperty({ type: SpeedDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => SpeedDto)
  speed?: SpeedDto;

  @ApiProperty({ type: SkillsDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => SkillsDto)
  skills?: SkillsDto;

  @ApiProperty({ type: [SenseDto], default: [] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SenseDto)
  senses?: SenseDto[];
}