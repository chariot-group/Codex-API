import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { ALIGNMENT, Alignment } from "@/resources/monsters/constants/alignment.constant";

@Schema({ _id: false })
export class Profile {

  @ApiProperty({ example: 'Goblin' })
  @Prop()
  type?: string;

  @ApiProperty({ example: 'Humanoid' })
  @Prop()
  subtype?: string;
  
  @ApiProperty({ example: 'Chaotic Good' })
  @Prop({
    type: String,
    required: true,
    enum: ALIGNMENT,
  })
  alignment: Alignment;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
