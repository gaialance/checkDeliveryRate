import { Test, TestingModule } from '@nestjs/testing';
import { CheckRatesController } from './check-rates.controller';
import { CheckRatesService } from './check-rates.service';

describe('CheckRatesController', () => {
  let controller: CheckRatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckRatesController],
      providers: [CheckRatesService],
    }).compile();

    controller = module.get<CheckRatesController>(CheckRatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
