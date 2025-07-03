import { Module } from '@nestjs/common';
import { DysonService } from '@/script/dyson/dyson.service';

@Module({
  imports: [],
  providers: [DysonService],
  exports: [DysonService],
})
export class DysonModule {}
