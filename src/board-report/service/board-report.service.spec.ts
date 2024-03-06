import { Test, TestingModule } from '@nestjs/testing';
import { BoardReportService } from './board-report.service';

describe('BoardReportService', () => {
  let service: BoardReportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardReportService],
    }).compile();

    service = module.get<BoardReportService>(BoardReportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
