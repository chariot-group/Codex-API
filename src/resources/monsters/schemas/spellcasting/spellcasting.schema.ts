import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema } from "mongoose";
import { SpellContent } from "@/resources/spells/schemas/spell-content.schema";

@Schema({ _id: false })
export class Spellcasting {
  @Prop()
  ability?: string;

  @Prop()
  saveDC?: number;

  @Prop()
  attackBonus: number;

  @Prop({
    type: Map,
    of: new MongooseSchema(
      {
        total: { type: Number, default: 0 },
        used: { type: Number, default: 0 },
      },
      { _id: false },
    ),
  })
  spellSlotsByLevel?: Map<number, { total?: number; used?: number }>;

  @Prop({ default: 0 })
  totalSlots: number;

  @Prop({ type: [SpellContent], default: [] })
  spells: SpellContent[];
}

export const SpellcastingSchema = SchemaFactory.createForClass(Spellcasting);
