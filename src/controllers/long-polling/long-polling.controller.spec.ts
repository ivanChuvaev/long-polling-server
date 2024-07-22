import { Test, TestingModule } from '@nestjs/testing';
import { LongPollingController } from './long-polling.controller';

describe('LongPollingController', () => {
  let controller: LongPollingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LongPollingController],
    }).compile();

    controller = module.get<LongPollingController>(LongPollingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
