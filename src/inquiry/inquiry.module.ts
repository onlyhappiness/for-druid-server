import { Module } from '@nestjs/common';
import { InquiryController } from './controller/inquiry.controller';
import { InquiryService } from './service/inquiry.service';

@Module({
  controllers: [InquiryController],
  providers: [InquiryService],
})
export class InquiryModule {}
