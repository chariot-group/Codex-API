import { Prop } from "@nestjs/mongoose";
import { Damage } from "@/resources/monsters/schemas/actions/sub/damage.schema";
import { Schema } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { DifficultyClass } from "@/resources/monsters/schemas/actions/sub/dificultyClass.schema";

/**
 * Le suppressReservedKeysWarning permet d'éviter les warnings de Mongoose
 * liés à l'utilisation de "save" comme nom de propriété.
 */
@Schema({ _id: false, suppressReservedKeysWarning: true })
export class Action {

  @ApiProperty({ example: 'Bite' })
  @Prop()
  name?: string;

  @ApiProperty({ example: 'Melee Weapon Attack' })
  @Prop()
  type?: string;

  @ApiProperty({ example: 'The target must succeed on a DC 18 Constitution saving throw or be paralyzed for 1 minute.' })
  @Prop()
  description?: string;

  @ApiProperty({ example: 5 })
  @Prop()
  attackBonus?: number;

  @ApiProperty({ type: [Damage] })
  @Prop({ type: [Damage], default: [] })
  damage?: Damage[];

  @ApiProperty({ example: '5 ft.' })
  @Prop()
  range?: string;

  @ApiProperty({ type: DifficultyClass })
  @Prop({ type: DifficultyClass, default: null })
  dc?: DifficultyClass;

  @ApiProperty({ example: 2, description: 'Cost of the action (for legendary actions)' })
  @Prop()
  cost?: number;
}
