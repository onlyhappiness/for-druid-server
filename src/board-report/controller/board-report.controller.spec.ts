import { Test, TestingModule } from '@nestjs/testing';
import { BoardReportController } from './board-report.controller';

describe('BoardReportController', () => {
  let controller: BoardReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardReportController],
    }).compile();

    controller = module.get<BoardReportController>(BoardReportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
