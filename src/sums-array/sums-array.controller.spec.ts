import { Test, TestingModule } from '@nestjs/testing';
import { SumsArrayController } from './sums-array.controller';
import { SumsArrayService } from './sums-array.service';

describe('SumsArrayController', () => {
  let controller: SumsArrayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SumsArrayController],
      providers: [SumsArrayService],
    }).compile();

    controller = module.get<SumsArrayController>(SumsArrayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
