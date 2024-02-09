import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SmsRequestDto } from '@verification/dto/sms.request.dto';
import { SmsVerifyDto } from '@verification/dto/sms.verify.dto';
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

  async sendSMS(body: SmsRequestDto) {
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

  async verifySms(body: SmsVerifyDto) {
    const { to, key } = body;

    const queryBuilder =
      this.verificationRepository.createQueryBuilder('verification');

    try {
      const verify = await queryBuilder
        .where('verification.to = :to', { to })
        .andWhere('verification.key = :key', { key })
        .getOne();

      if (!verify) {
        throw new HttpException('올바른 인증 코드가 이닙니다.', 400);
      }
      return true;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
