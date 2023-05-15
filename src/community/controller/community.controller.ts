import { JwtAuthGuard } from '@auth/jwt/jwt.guard';
import { CurrentUser } from '@common/decorators/user.decorator';
import { CreateCommunityDTO } from '@community/dto/create.community.dto';
import { CommunityService } from '@community/service/community.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Users } from '@user/model/user.entity';

@ApiTags('Menu')
@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @ApiOperation({ summary: '커뮤니티 보기' })
  @ApiParam({
    name: 'page',
    required: true,
    description: '요청할 페이지',
    example: 1,
  })
  @Get()
  async findAllCommunity(@Query('page') page = 1) {
    return await this.communityService.findAllCommunity(page);
  }

  @ApiOperation({ summary: '커뮤니티 상세' })
  @ApiParam({
    name: 'communityId',
    required: true,
    description: '커뮤니티 아이디',
    type: 'number',
  })
  @Get('/:communityId')
  async findCommunity(@Param('communityId') communityId: number) {
    return await this.communityService.findCommunity(communityId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '커뮤니티 생성' })
  @ApiBody({
    type: CreateCommunityDTO,
  })
  @Post()
  async createCommunity(
    @CurrentUser() currentUser: Users,
    @Body() body: CreateCommunityDTO,
  ) {
    return await this.communityService.createCommunity(currentUser, body);
  }

  // 커뮤니티 수정

  // 커뮤니티 삭제
}
