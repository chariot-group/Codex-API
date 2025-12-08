import { Module } from "@nestjs/common";
import { SpellsService } from "@/resources/spells/spells.service";
import { SpellsController } from "@/resources/spells/spells.controller";
import { Spell, SpellSchema } from "@/resources/spells/schemas/spell.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forFeature([{ name: Spell.name, schema: SpellSchema }])],
  exports: [MongooseModule.forFeature([{ name: Spell.name, schema: SpellSchema }])],
  controllers: [SpellsController],
  providers: [SpellsService],
})
export class SpellsModule {}
