import { JwtAuthGuard } from '@auth/jwt/jwt.guard';
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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam } from '@nestjs/swagger';
import { Users } from '@user/model/user.entity';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiParam({
    name: 'communityId',
    required: true,
    description: '커뮤니티 아이디',
    type: 'number',
  })
  @ApiOperation({ summary: '댓글 보기' })
  @Get('/:communityId')
  async findComment(@Param('communityId') communityId: number) {
    return await this.commentService.findComment(communityId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '댓글 작성' })
  @ApiParam({
    name: 'communityId',
    required: true,
    description: '커뮤니티 아이디',
    type: 'number',
  })
  @Post('/:communityId')
  async createComment(
    @Param('communityId') communityId: number,
    @CurrentUser() currentUser: Users,
    @Body() body,
  ) {
    return await this.commentService.createComment(
      communityId,
      currentUser,
      body,
    );
  }

  @ApiOperation({ summary: '댓글 수정' })
  @Put()
  async updateComment() {
    return '댓글 수정';
  }

  @ApiOperation({ summary: '댓글 삭제' })
  @Delete()
  async deleteComment() {
    return '댓글 삭제';
  }
}
