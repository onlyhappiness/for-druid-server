import { Category } from '@category/model/category.entity';
import { ChatMessage } from '@chat/model/chat-message.entity';
import { ChatRoom } from '@chat/model/chat-room.entity';
import { Comment } from '@comment/model/comment.entity';
import { Community } from '@community/model/community.entity';
import { Event } from '@event/model/event.entity';
import { Faq } from '@faq/model/faq.entity';
import { Favorite } from '@favorite/model/favorite.entity';
import { Inquiry } from '@inquiry/model/inquiry.entity';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Notice } from '@notice/model/notice.entity';
import { Users } from '@user/model/user.entity';
import * as Joi from 'joi';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ChatGateway } from './chat/chat.gateway';
import { ChatModule } from './chat/chat.module';
import { CommentModule } from './comment/comment.module';
import { CommunityModule } from './community/community.module';
import { EventModule } from './event/event.module';
import { FaqModule } from './faq/faq.module';
import { FavoriteModule } from './favorite/favorite.module';
import { InquiryModule } from './inquiry/inquiry.module';
import { NoticeModule } from './notice/notice.module';
import { UserModule } from './user/user.module';

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
      ChatMessage,
      ChatRoom,
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
