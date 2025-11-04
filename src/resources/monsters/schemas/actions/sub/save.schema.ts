import { Prop, Schema } from "@nestjs/mongoose";

@Schema({ _id: false })
export class Save {
  @Prop()
  type: string; // "str", "dex", "con", "int", "wis", "cha"

  @Prop()
  dc: number;

  @Prop()
  successType?: string; // "none", "half", etc.
}
