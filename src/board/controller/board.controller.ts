import { JwtAuthGuard } from '@auth/jwt/jwt.guard';
import { CreateBoardDto } from '@board/dto/create.board.dto';
import { UpdateBoardDto } from '@board/dto/update.board.dto';
import { CreateCommentDto } from '@comment/dto/create.comment.dto';
import { UpdateCommentDto } from '@comment/dto/update.comment.dto';
import { CommentService } from '@comment/service/comment.service';
import { CurrentUser } from '@common/decorators/user.decorator';
import { CreateLikeDto } from '@like/dto/create.like.dto';
import { LikeService } from '@like/service/like.service';
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
import { BoardService } from '../service/board.service';

@ApiTags('게시글 관련')
@Controller('board')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly likeService: LikeService,
    private readonly commentService: CommentService,
  ) {}

  @Get('')
  @ApiOperation({ summary: '게시글 리스트 조회' })
  @ApiQuery({
    name: 'page',
    required: true,
    description: 'page',
  })
  @ApiQuery({
    name: 'limit',
    required: true,
    description: 'limit',
  })
  async findBoardList(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return await this.boardService.findBoardList(page, limit);
  }

  @Get('/:boardId')
  @ApiOperation({ summary: '게시글 상세 조회' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'boardId',
    required: true,
    description: '게시글 id',
    type: 'number',
  })
  async findBoardDetail(
    @CurrentUser() currentUser: Users,
    @Param('boardId') boardId: number,
  ) {
    return await this.boardService.findBoardDetail(currentUser, boardId);
  }

  @Post('')
  @ApiOperation({ summary: '게시글 생성' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CreateBoardDto })
  async createBoard(
    @CurrentUser() currentUser: Users,
    @Body() body: CreateBoardDto,
  ) {
    return await this.boardService.createBoard(currentUser, body);
  }

  @Put('/:boardId')
  @ApiOperation({ summary: '게시글 수정' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'boardId',
    required: true,
    description: '게시글 id',
    type: 'number',
  })
  async updateBoard(
    @CurrentUser() currentUser: Users,
    @Param('boardId') boardId: number,
    @Body() body: UpdateBoardDto,
  ) {
    await this.boardService.findBoardByUser(currentUser.id, boardId);

    return await this.boardService.updateBoard(currentUser, body, boardId);
  }

  @Delete('/:boardId')
  @ApiOperation({ summary: '게시글 삭제' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'boardId',
    required: true,
    description: '게시글 id',
    type: 'number',
  })
  async deleteBoard(
    @CurrentUser() currentUser: Users,
    @Param('boardId') boardId: number,
  ) {
    await this.boardService.findBoardByUser(currentUser.id, boardId);

    return await this.boardService.deleteBoard(boardId);
  }

  // 좋아요
  @Post('/like/:boardId')
  @ApiOperation({
    summary: '게시글 좋아요',
    description: 'body값에 true를 주면 좋아요, false를 주면 좋아요 취소',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CreateLikeDto })
  @ApiParam({
    name: 'boardId',
    required: true,
    description: '게시글 id',
    type: 'number',
  })
  async boardLike(
    @CurrentUser() currentUser: Users,
    @Param('boardId') boardId: number,
    @Body() body: CreateLikeDto,
  ) {
    return await this.likeService.createLike(currentUser, body, boardId);
  }

  // 댓글
  @Get('/comment/:boardId')
  @ApiOperation({ summary: '댓글 조회' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'boardId',
    required: true,
    description: '게시글 id',
    type: 'number',
  })
  @ApiQuery({
    name: 'cursor',
    description: 'cursor',
  })
  @ApiQuery({
    name: 'limit',
    required: true,
    description: 'limit',
  })
  async findComments(
    @Query('cursor', new DefaultValuePipe(0), ParseIntPipe) cursor: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Param('boardId') boardId: number,
  ) {
    await this.boardService.findBoardById(boardId);

    return await this.commentService.findComment(cursor, limit, boardId);
  }

  @Post('/comment/:boardId')
  @ApiOperation({ summary: '댓글 달기' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CreateCommentDto })
  @ApiParam({
    name: 'boardId',
    required: true,
    description: '게시글 id',
    type: 'number',
  })
  async createComment(
    @CurrentUser() currentUser: Users,
    @Body() body: CreateCommentDto,
    @Param('boardId') boardId: number,
  ) {
    await this.boardService.findBoardById(boardId);

    return await this.commentService.createComment(currentUser, body, boardId);
  }

  @Put('/comment/:commentId')
  @ApiOperation({ summary: '댓글 수정' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: UpdateCommentDto })
  @ApiParam({
    name: 'commentId',
    required: true,
    description: '댓글 id',
    type: 'number',
  })
  async updateComment(
    @CurrentUser() currnetUser: Users,
    @Body() body: UpdateCommentDto,
    @Param('commentId') commentId: number,
  ) {
    await this.commentService.findCommentById(commentId);

    return this.commentService.updateComment(body, commentId);
  }

  @Delete('/comment/:commentId')
  @ApiOperation({ summary: '댓글 삭제' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'commentId',
    required: true,
    description: '댓글 id',
    type: 'number',
  })
  async deleteComment(@Param('commentId') commentId: number) {
    await this.commentService.findCommentById(commentId);

    return await this.commentService.deleteComment(commentId);
  }
}
