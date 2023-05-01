import { Module } from '@nestjs/common';
import { FaqService } from './service/faq.service';
import { FaqController } from './controller/faq.controller';

@Module({
  providers: [FaqService],
  controllers: [FaqController],
})
export class FaqModule {}
