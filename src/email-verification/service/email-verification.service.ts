import { EmailVerification } from '@email-verification/model/email-verification.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EmailVerificationService {
  constructor(
    @InjectRepository(EmailVerification)
    private readonly emailVerificationRepository: Repository<EmailVerification>,
    private readonly mailerService: MailerService,
  ) {}

  // 인증코드 생성
  generateDigitCode() {
    return Math.floor(Math.random() * 900000) + 100000;
  }

  async sendEmail(email: string) {
    const code = this.generateDigitCode();
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: '드루이드 다이어리 인증코드',
        text: `드루이드 다이어리 인증코드입니다.\n\n${code}`,
      });

      await this.emailVerificationRepository.save({
        to: email,
        code: code,
        count: 1,
      });
      return true;
    } catch (error) {
      console.error('이메일 전송 실패: ', error);
      throw new InternalServerErrorException();
    }
  }
}
