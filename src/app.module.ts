import { BoardModule } from '@board/board.module';
import { Board } from '@board/model/board.enttiy';
import { LikeModule } from '@like/like.module';
import { Like } from '@like/model/like.entity';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Users } from '@user/model/user.entity';
import { Verification } from '@verification/model/verification.entity';
import * as Joi from 'joi';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { VerificationModule } from './verification/verification.module';

const typeOrmModuleOptions = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    // ssl: {
    //   rejectUnauthorized: true,
    // },
    entities: [Users, Verification, Board, Like],
    synchronize: true, // ! set 'false' in production
    autoLoadEntities: true,
    logging: true,
    keepConnectionAlive: true,
  }),
  inject: [ConfigService],
};
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
    // MailerModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     transport: {
    //       host: 'smtp.naver.com',
    //       port: 587,
    //       auth: {
    //         user: configService.get('EMAIL_ADDRESS'),
    //         pass: configService.get('EMAIL_PASSWORD'),
    //       },
    //     },
    //     defaults: {
    //       from: configService.get('EMAIL_ADDRESS'),
    //     },
    //   }),
    // }),
    AuthModule,
    UserModule,
    VerificationModule,
    BoardModule,
    LikeModule,
    // EmailVerificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
