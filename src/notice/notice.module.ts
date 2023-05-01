import { Module } from '@nestjs/common';
import { NoticeService } from './service/notice.service';
import { NoticeController } from './controller/notice.controller';

@Module({
  providers: [NoticeService],
  controllers: [NoticeController],
})
export class NoticeModule {}
