import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ _id: false })
export class Profile {
  @Prop()
  type?: string;

  @Prop()
  subtype?: string;
  @Prop()
  alignment?: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
