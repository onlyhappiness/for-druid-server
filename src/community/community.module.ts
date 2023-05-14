import { Module } from '@nestjs/common';
import { CommunityController } from './controller/community.controller';
import { CommunityService } from './service/community.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Community } from './model/community.entity';
import { CategoryModule } from '@category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Community]), CategoryModule],
  controllers: [CommunityController],
  providers: [CommunityService],
  exports: [CommunityService],
})
export class CommunityModule {}
