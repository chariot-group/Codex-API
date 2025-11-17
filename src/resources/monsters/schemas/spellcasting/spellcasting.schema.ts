import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema, Types } from "mongoose";
import { Spell } from "@/resources/spells/schemas/spell.schema";

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
  spellSlotsByLevel?: Map<string, { total?: number; used?: number }>;

  @Prop({ default: 0 })
  totalSlots: number;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: "Spell" }], default: [] })
  spells: Types.ObjectId[];
}

export const SpellcastingSchema = SchemaFactory.createForClass(Spellcasting);
