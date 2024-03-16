import { BoardModule } from '@board/board.module';
import { LikeModule } from '@like/like.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BoardReportModule } from './board-report/board-report.module';
import { CommentModule } from './comment/comment.module';
import { joiConfig, typeOrmModuleOptions } from './config';
import { UserModule } from './user/user.module';
import { VerificationModule } from './verification/verification.module';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object(joiConfig),
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    AuthModule,
    UserModule,
    VerificationModule,
    BoardModule,
    BoardReportModule,
    LikeModule,
    CommentModule,
    S3Module,
    // ThrottlerModule.forRoot([{ ttl: 5000, limit: 5 }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
