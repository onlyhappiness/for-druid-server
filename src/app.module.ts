import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FavoriteModule } from './favorite/favorite.module';
import { EventModule } from './event/event.module';
import { NoticeModule } from './notice/notice.module';
import { FaqModule } from './faq/faq.module';
import * as Joi from 'joi';
import { Users } from '@user/model/user.entity';
import { Event } from '@event/model/event.entity';
import { Notice } from '@notice/model/notice.entity';
import { Faq } from '@faq/model/faq.entity';
import { CategoryModule } from './category/category.module';
import { CommunityModule } from './community/community.module';
import { Category } from '@category/model/category.entity';
import { Community } from '@community/model/community.entity';
import { Favorite } from '@favorite/model/favorite.entity';
import { CommentModule } from './comment/comment.module';
import { Comment } from '@comment/model/comment.entity';
import { InquiryModule } from './inquiry/inquiry.module';
import { Inquiry } from '@inquiry/model/inquiry.entity';
import { S3Module } from './s3/s3.module';
import { ChatGateway } from './chat/chat.gateway';
import { ChatModule } from './chat/chat.module';

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
    entities: [
      Category,
      Comment,
      Community,
      Event,
      Faq,
      Favorite,
      Inquiry,
      Notice,
      Users,
    ],
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
    AuthModule,
    UserModule,
    FavoriteModule,
    EventModule,
    NoticeModule,
    FaqModule,
    CategoryModule,
    CommunityModule,
    CommentModule,
    InquiryModule,
    ChatModule,
    // S3Module,
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
