import { BoardService } from '@board/service/board.service';
import { CreateCommentDto } from '@comment/dto/create.comment.dto';
import { Comment } from '@comment/model/comment.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '@user/model/user.entity';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly boardService: BoardService,
  ) {}

  /** 댓글 달기 */
  async createComment(
    currentUser: Users,
    body: CreateCommentDto,
    boardId: number,
  ) {
    await this.boardService.findBoardById(boardId);

    const { id: userId } = currentUser;

    const commentInfo = {
      User: userId,
      Board: boardId,
      ...body,
    };
    const createComment = plainToInstance(Comment, commentInfo);
    const comment = await this.commentRepository.save(createComment);
    return comment;
  }
}
