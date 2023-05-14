import { CommunityService } from '@community/service/community.service';
import { Controller, Get, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  // 커뮤니티 보기
  @ApiOperation({ summary: '커뮤니티 보기' })
  @Get()
  async findAllCommunity() {}

  // 커뮤니티 상세
  @ApiOperation({ summary: '커뮤니티 상세' })
  @Get('/:communityId')
  async findCommunity() {}

  // 커뮤니티 생성
  @ApiOperation({ summary: '커뮤니티 생성' })
  @Post()
  async createCommunity() {}

  // 커뮤니티 수정

  // 커뮤니티 삭제
}
