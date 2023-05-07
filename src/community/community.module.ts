import { Module } from '@nestjs/common';
import { CommunityController } from './controller/community.controller';
import { CommunityService } from './service/community.service';

@Module({
  controllers: [CommunityController],
  providers: [CommunityService],
})
export class CommunityModule {}
