import { Controller } from '@nestjs/common';
import { InquiryService } from '../service/inquiry.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('inquiry')
export class InquiryController {
  constructor(private readonly inquiryService: InquiryService) {}
}
