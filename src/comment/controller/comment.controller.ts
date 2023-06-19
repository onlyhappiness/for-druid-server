import { JwtAuthGuard } from '@auth/jwt/jwt.guard';
import { CreateCommentDTO } from '@comment/dto/create.comment.dto';
import { CommentService } from '@comment/service/comment.service';
import { CurrentUser } from '@common/decorators/user.decorator';
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
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Users } from '@user/model/user.entity';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiQuery({
    name: 'communityId',
    required: true,
    description: '커뮤니티 아이디',
    type: 'number',
  })
  @ApiOperation({ summary: '댓글 보기' })
  @Get()
  async findComment(@Query('communityId') communityId: number) {
    return await this.commentService.findComment(communityId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '댓글 작성' })
  @ApiQuery({
    name: 'communityId',
    required: true,
    description: '커뮤니티 아이디',
    type: 'number',
  })
  @Post()
  async createComment(
    @Query('communityId') communityId: number,
    @CurrentUser() currentUser: Users,
    @Body() body: CreateCommentDTO,
  ) {
    return await this.commentService.createComment(
      communityId,
      currentUser,
      body,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '댓글 수정' })
  @ApiParam({
    name: 'commentId',
    required: true,
    description: '댓글 아이디',
    type: 'number',
  })
  @Put('/:commentId')
  async updateComment(
    @Param('commentId') commentId: number,
    @Body() body: CreateCommentDTO,
  ) {
    return await this.commentService.updateComment(commentId, body);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '댓글 삭제' })
  @ApiParam({
    name: 'commentId',
    required: true,
    description: '댓글 아이디',
    type: 'number',
  })
  @Delete('/:commentId')
  async deleteComment(
    @Param('commentId') commentId: number,
    @CurrentUser() currentUser: Users,
  ) {
    return await this.commentService.deleteComment(commentId, currentUser);
  }
}
