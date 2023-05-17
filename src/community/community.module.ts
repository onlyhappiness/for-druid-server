import { Module } from '@nestjs/common';
import { CommunityController } from './controller/community.controller';
import { CommunityService } from './service/community.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Community } from './model/community.entity';
import { CategoryModule } from '@category/category.module';
import { AuthModule } from '@auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Community]), CategoryModule, AuthModule],
  controllers: [CommunityController],
  providers: [CommunityService],
  exports: [CommunityService],
})
export class CommunityModule {}
