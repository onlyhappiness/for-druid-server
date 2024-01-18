import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SendEmailDTO } from '../dto/send-email.dto';
import { EmailVerificationService } from '../service/email-verification.service';

@ApiTags('Verification')
@Controller('email-verification')
export class EmailVerificationController {
  constructor(
    private readonly emailVerificationService: EmailVerificationService,
  ) {}

  @Post('/send-email')
  @ApiOperation({ summary: '이메일 인증코드 발송' })
  @ApiBody({
    type: SendEmailDTO,
  })
  async sendEmail(@Body() body: SendEmailDTO) {
    return await this.emailVerificationService.sendEmail(body.to);
  }
}
