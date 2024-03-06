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
import { typeOrmModuleOptions } from './typeorm.config';
import { UserModule } from './user/user.module';
import { VerificationModule } from './verification/verification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(4000),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_ACESS_TOKEN_SECRET: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    AuthModule,
    UserModule,
    VerificationModule,
    BoardModule,
    BoardReportModule,
    LikeModule,
    CommentModule,
    // ThrottlerModule.forRoot([{ ttl: 5000, limit: 5 }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
