import { JwtAuthGuard } from '@auth/jwt/jwt.guard';
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
import { CreateNoticeDTO } from '@notice/dto/create.notice.dto';
import { UpdateNoticeDTO } from '@notice/dto/update.notice.dto';
import { NoticeService } from '@notice/service/notice.service';

@ApiTags('Notice')
@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Get()
  @ApiOperation({ summary: '공지사항 보기' })
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
  async findAllNotice(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(15), ParseIntPipe) limit: number,
  ) {
    return this.noticeService.findAllNotice(page, limit);
  }

  @Get('/:noticeId')
  @ApiOperation({ summary: '공지사항 상세' })
  @ApiParam({
    name: 'noticeId',
    required: true,
    description: '공지사항 아이디',
    type: 'number',
  })
  async findNotice(@Param('noticeId') noticeId: number) {
    return this.noticeService.findNotice(noticeId);
  }

  @Post()
  @ApiOperation({ summary: '공지사항 생성' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    type: CreateNoticeDTO,
  })
  async createNotice(@Body() body: CreateNoticeDTO) {
    return this.noticeService.createNotice(body);
  }

  @Put('/:noticeId')
  @ApiOperation({ summary: '공지사항 수정' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'noticeId',
    required: true,
    description: '공지사항 아이디',
    type: 'number',
  })
  async updateNotice(
    @Param('noticeId') noticeId: number,
    @Body() body: UpdateNoticeDTO,
  ) {
    return this.noticeService.updateNotice(noticeId, body);
  }

  @Delete('/:noticeId')
  @ApiOperation({ summary: '공지사항 삭제' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'noticeId',
    required: true,
    description: '공지사항 아이디',
    type: 'number',
  })
  async deleteNotice(@Param('noticeId') noticeId: number) {
    return this.noticeService.delteNotice(noticeId);
  }
}
