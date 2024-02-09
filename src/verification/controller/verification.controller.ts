import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SmsRequestDto } from '@verification/dto/sms.request.dto';
import { SmsVerifyDto } from '@verification/dto/sms.verify.dto';
import { VerificationService } from '@verification/service/verification.service';

@ApiTags('Verification')
@Controller('verification')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Post('/sms-request')
  @ApiOperation({ summary: 'SMS 인증 요청' })
  @ApiBody({
    type: SmsRequestDto,
  })
  async sendSMS(@Body() body: SmsRequestDto) {
    return await this.verificationService.sendSMS(body);
  }

  @Post('/sms-verify')
  @ApiOperation({ summary: 'SMS 인증 검증' })
  @ApiBody({
    type: SmsVerifyDto,
  })
  async verifySMS(@Body() body: SmsVerifyDto) {
    return await this.verificationService.verifySms(body);
  }
}
