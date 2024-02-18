import { JwtAuthGuard } from '@auth/jwt/jwt.guard';
import { CreateBoardDto } from '@board/dto/create.board.dto';
import { CurrentUser } from '@common/decorators/user.decorator';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
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
import { BoardService } from '../service/board.service';

@ApiTags('게시글 관련')
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('')
  @ApiOperation({ summary: '게시글 리스트 조회' })
  @ApiQuery({
    name: 'page',
    required: true,
    description: '1',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: true,
    description: '10',
    example: 10,
  })
  async findBoardList(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return await this.boardService.findBoardList(page, limit);
  }

  @Get('/:boardId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'boardId',
    required: true,
    description: '게시글 id',
    type: 'number',
  })
  @ApiOperation({ summary: '게시글 상세 조회' })
  async findBoardDetail(
    @CurrentUser() currentUser: Users,
    @Param('boardId') boardId: number,
  ) {
    return await this.boardService.findBoardDetail(boardId);
  }

  @Post('')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CreateBoardDto })
  @ApiOperation({ summary: '게시글 생성' })
  async createBoard(
    @CurrentUser() currentUser: Users,
    @Body() body: CreateBoardDto,
  ) {
    return await this.boardService.createBoard(currentUser, body);
  }
}
