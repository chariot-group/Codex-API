import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Action } from "@/resources/monsters/schemas/actions/sub/action.schema";

@Schema({ _id: false })
export class Actions {
  @Prop({ type: [Action], default: [] })
  standard: Action[];

  @Prop({ type: [Action], default: [] })
  legendary: Action[];

  @Prop()
  legendaryActionsPerDay?: number;

  @Prop({ type: [Action], default: [] })
  lair: Action[];

  @Prop({ type: [Action], default: [] })
  reactions: Action[];

  @Prop({ type: [Action], default: [] })
  bonus: Action[];
}

export const ActionsSchema = SchemaFactory.createForClass(Actions);
