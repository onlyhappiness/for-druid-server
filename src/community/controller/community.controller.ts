import { JwtAuthGuard } from '@auth/jwt/jwt.guard';
import { CurrentUser } from '@common/decorators/user.decorator';
import { CreateCommunityDTO } from '@community/dto/create.community.dto';
import { UpdateCommunityDTO } from '@community/dto/update.community.dto';
import { CommunityService } from '@community/service/community.service';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Users } from '@user/model/user.entity';

@ApiTags('Community')
@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Get()
  @ApiOperation({ summary: '커뮤니티 보기' })
  @ApiQuery({
    name: 'page',
    required: true,
    description: '설정 안 할 경우 기본값 1',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: true,
    description: '설정 안 할 경우 기본값 15',
    example: 15,
  })
  async findAllCommunity(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(15), ParseIntPipe) limit: number,
  ) {
    return await this.communityService.findAllCommunity(page, limit);
  }

  @Get('/:communityId')
  @ApiOperation({ summary: '커뮤니티 상세' })
  @ApiParam({
    name: 'communityId',
    required: true,
    description: '커뮤니티 아이디',
    type: 'number',
  })
  async findCommunity(@Param('communityId') communityId: number) {
    return await this.communityService.findCommunity(communityId);
  }

  @Post()
  @ApiOperation({ summary: '커뮤니티 생성' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    type: CreateCommunityDTO,
  })
  async createCommunity(
    @CurrentUser() currentUser: Users,
    @Body() body: CreateCommunityDTO,
  ) {
    return await this.communityService.createCommunity(currentUser, body);
  }

  @Put('/:communityId')
  @ApiOperation({ summary: '커뮤니티 수정' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'communityId',
    required: true,
    description: '커뮤니티 아이디',
    type: 'number',
  })
  async updateCommunity(
    @Param('communityId') communityId: number,
    @CurrentUser() currentUser: Users,
    @Body() body: UpdateCommunityDTO,
  ) {
    return await this.communityService.updateCommunity(
      communityId,
      currentUser,
      body,
    );
  }

  @Delete('/:communityId')
  @ApiOperation({ summary: '커뮤니티 삭제' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'communityId',
    required: true,
    description: '커뮤니티 아이디',
    type: 'number',
  })
  async deleteCommunity(
    @Param('communityId') communityId: number,
    @CurrentUser() currentUser: Users,
  ) {
    return await this.communityService.deleteCommunity(
      communityId,
      currentUser,
    );
  }
}
