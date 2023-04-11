import { Test, TestingModule } from '@nestjs/testing';
import { CheckRatesService } from './check-rates.service';

describe('CheckRatesService', () => {
  let service: CheckRatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckRatesService],
    }).compile();

    service = module.get<CheckRatesService>(CheckRatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
