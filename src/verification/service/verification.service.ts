import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Verification,
  VerificationType,
} from '@verification/model/verification.entity';
import * as AWS from 'aws-sdk';
import { Repository } from 'typeorm';

@Injectable()
export class VerificationService {
  private readonly sns: AWS.SNS;

  constructor(
    @InjectRepository(Verification)
    private readonly verificationRepository: Repository<Verification>,
  ) {
    this.sns = new AWS.SNS({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_ID,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });
  }

  // 인증코드 생성
  generateDigitCode() {
    return Math.floor(Math.random() * 900000) + 100000;
  }

  async sendSMS(body) {
    const { to } = body;

    const code = this.generateDigitCode();

    try {
      const params: AWS.SNS.PublishInput = {
        Message: `드루이드 다이어리 인증코드입니다.\n\n${code}`,
        PhoneNumber: `+82${to}`,
      };
      this.sns.publish(params).promise();

      await this.verificationRepository.save({
        type: VerificationType.SMS,
        to: to,
        key: code.toString(),
      });

      return true;
    } catch (error) {
      console.error('sms 인증코드 전송 실패: ', error);
      throw new HttpException(error, 400);
    }
  }
}
