import { Prop } from "@nestjs/mongoose";
import { Damage } from "@/resources/monsters/schemas/actions/sub/damage.schema";
import { Save } from "@/resources/monsters/schemas/actions/sub/save.schema";
import { Usage } from "@/resources/monsters/schemas/actions/sub/usage.schema";
import { Schema } from "@nestjs/mongoose";

@Schema({ _id: false })
export class Action {
  @Prop()
  name?: string;

  @Prop()
  type?: string;

  @Prop()
  attackBonus?: number;

  @Prop({ type: Damage, default: {} })
  damage: Damage;

  @Prop()
  range?: string;

  @Prop({ type: Save })
  save?: Save;

  @Prop()
  description?: string;

  @Prop({ type: Usage })
  usage?: Usage;

  @Prop()
  legendaryActionCost?: number;
}
