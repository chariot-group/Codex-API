import { Prop, Schema } from "@nestjs/mongoose";

@Schema({ _id: false })
export class Save {
  /**
   * @type string
   * "str", "dex", "con", "int", "wis", "cha"
   */
  @Prop()
  type: string;

  @Prop()
  dc: number;

  /**
   * @type string
   * "none", "half", etc.
   */
  @Prop()
  successType?: string;
}
