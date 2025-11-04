import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ _id: false })
export class Usage {
  @Prop()
  type: string; // "at will", "per day", "recharge" etc.

  @Prop()
  times?: number; // nombre d'utilisations si limité

  @Prop()
  dice?: string; // pour les capacités qui rechargent sur un jet de dé

  @Prop()
  minValue?: number; // valeur minimum pour le rechargement
}

export const UsageSchema = SchemaFactory.createForClass(Usage);
