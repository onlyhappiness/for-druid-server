import { Module } from '@nestjs/common';
import { NoticeService } from './service/notice.service';
import { NoticeController } from './controller/notice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notice } from './model/notice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notice])],
  controllers: [NoticeController],
  providers: [NoticeService],
  exports: [NoticeService],
})
export class NoticeModule {}
