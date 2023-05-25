import { JwtAuthGuard } from '@auth/jwt/jwt.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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

  @ApiOperation({ summary: '공지사항 보기' })
  @ApiQuery({
    name: 'page',
    required: true,
    description: '요청할 페이지',
    example: 1,
  })
  @Get()
  async findAllNotice(@Query('page') page = 1) {
    return this.noticeService.findAllNotice(page);
  }

  @ApiOperation({ summary: '공지사항 상세' })
  @ApiParam({
    name: 'noticeId',
    required: true,
    description: '공지사항 아이디',
    type: 'number',
  })
  @Get('/:noticeId')
  async findNotice(@Param('noticeId') noticeId: number) {
    return this.noticeService.findNotice(noticeId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '공지사항 생성' })
  @ApiBody({
    type: CreateNoticeDTO,
  })
  @Post()
  async createNotice(@Body() body: CreateNoticeDTO) {
    return this.noticeService.createNotice(body);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '공지사항 수정' })
  @ApiParam({
    name: 'noticeId',
    required: true,
    description: '공지사항 아이디',
    type: 'number',
  })
  @Put('/:noticeId')
  async updateNotice(
    @Param('noticeId') noticeId: number,
    @Body() body: UpdateNoticeDTO,
  ) {
    return this.noticeService.updateNotice(noticeId, body);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '공지사항 삭제' })
  @ApiParam({
    name: 'noticeId',
    required: true,
    description: '공지사항 아이디',
    type: 'number',
  })
  @Delete('/:noticeId')
  async deleteNotice(@Param('noticeId') noticeId: number) {
    return this.noticeService.delteNotice(noticeId);
  }
}
