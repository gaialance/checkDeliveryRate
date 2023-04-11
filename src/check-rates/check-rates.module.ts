import { Module } from '@nestjs/common';
import { CheckRatesService } from './check-rates.service';
import { CheckRatesController } from './check-rates.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [CheckRatesController],
  providers: [CheckRatesService]
})
export class CheckRatesModule {}
