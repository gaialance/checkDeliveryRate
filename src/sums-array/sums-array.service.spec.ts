import { Test, TestingModule } from '@nestjs/testing';
import { SumsArrayService } from './sums-array.service';

describe('SumsArrayService', () => {
  let service: SumsArrayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SumsArrayService],
    }).compile();

    service = module.get<SumsArrayService>(SumsArrayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
