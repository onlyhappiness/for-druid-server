import { FaqService } from '@faq/service/faq.service';
import { Controller, Get } from '@nestjs/common';

@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}
}
