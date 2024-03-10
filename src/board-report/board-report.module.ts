import { Module } from '@nestjs/common';
import { BoardReportController } from './controller/board-report.controller';
import { BoardReportService } from './service/board-report.service';

@Module({
  controllers: [BoardReportController],
  providers: [BoardReportService],
})
export class BoardReportModule {}
