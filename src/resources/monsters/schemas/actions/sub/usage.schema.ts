import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ _id: false })
export class Usage {
  /**
   * @type string
   * "at will", "per day", "recharge" etc.
   */
  @Prop()
  type: string;

  /**
   * @type number
   * Nombre d'utilisations si limité
   */
  @Prop()
  times?: number;

  /**
   * @type string
   * Pour les capacités qui rechargent sur un jet de dé
   */
  @Prop()
  dice?: string;

  /**
   * @type number
   * Valeur minimum pour le rechargement
   */
  @Prop()
  minValue?: number;
}

export const UsageSchema = SchemaFactory.createForClass(Usage);
