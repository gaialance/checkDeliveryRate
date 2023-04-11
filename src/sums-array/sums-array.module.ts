import { Module } from '@nestjs/common';
import { SumsArrayService } from './sums-array.service';
import { SumsArrayController } from './sums-array.controller';

@Module({
  controllers: [SumsArrayController],
  providers: [SumsArrayService]
})
export class SumsArrayModule {}
