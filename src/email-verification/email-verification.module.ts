import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailVerificationController } from './controller/email-verification.controller';
import { EmailVerification } from './model/email-verification.entity';
import { EmailVerificationService } from './service/email-verification.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmailVerification])],
  controllers: [EmailVerificationController],
  providers: [EmailVerificationService],
  exports: [EmailVerificationService],
})
export class EmailVerificationModule {}
