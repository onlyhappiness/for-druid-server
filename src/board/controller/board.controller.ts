import { JwtAuthGuard } from '@auth/jwt/jwt.guard';
import { CreateBoardDto } from '@board/dto/create.board.dto';
import { UpdateBoardDto } from '@board/dto/update.board.dto';
import { CurrentUser } from '@common/decorators/user.decorator';
import { LikeService } from '@like/service/like.service';
import {
  Body,
  Controller,
  DefaultValuePipe,
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
import { BoardService } from '../service/board.service';

@ApiTags('게시글 관련')
@Controller('board')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly likeService: LikeService,
  ) {}

  @Get('')
  @ApiOperation({ summary: '게시글 리스트 조회' })
  @ApiQuery({
    name: 'page',
    required: true,
    description: 'page',
    // example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: true,
    description: 'limit',
    // example: 10,
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
    return await this.boardService.findBoardDetail(currentUser, boardId);
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

  @Post('/like/:boardId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'boardId',
    required: true,
    description: '게시글 id',
    type: 'number',
  })
  @ApiOperation({ summary: '게시글 좋아요' })
  async boardLike(
    @CurrentUser() currentUser: Users,
    @Param('boardId') boardId: number,
  ) {
    return await this.likeService.createLike(currentUser, boardId);
  }

  @Put('/:boardId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'boardId',
    required: true,
    description: '게시글 id',
    type: 'number',
  })
  @ApiOperation({ summary: '게시글 수정' })
  async updateBoard(
    @CurrentUser() currentUser: Users,
    @Param('boardId') boardId: number,
    @Body() body: UpdateBoardDto,
  ) {
    return await this.boardService.updateBoard(currentUser, body, boardId);
  }
}
