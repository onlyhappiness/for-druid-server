import { BoardService } from '@board/service/board.service';
import { CreateCommentDto } from '@comment/dto/create.comment.dto';
import { UpdateCommentDto } from '@comment/dto/update.comment.dto';
import { Comment } from '@comment/model/comment.entity';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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

  /** 댓글 아이디로 찾기 */
  async findCommentById(commentId: number) {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
    });
    if (!comment) {
      throw new NotFoundException('존재하지 않는 댓글입니다.');
    }

    return comment;
  }

  /** 댓글 달기 */
  async createComment(
    currentUser: Users,
    body: CreateCommentDto,
    boardId: number,
  ) {
    const { id: userId } = currentUser;

    const commentInfo = {
      User: userId,
      Board: Number(boardId),
      ...body,
    };
    const createComment = plainToInstance(Comment, commentInfo);
    const comment = await this.commentRepository.save(createComment);
    return comment;
  }

  /** 댓글 조회 */
  async findComment(cursor: number, limit: number, boardId: number) {
    const queryBuilder = this.commentRepository.createQueryBuilder('comment');

    try {
      const comment = await queryBuilder
        .where('comment.board_id = :boardId', { boardId })
        .andWhere(cursor ? 'comment.id > :cursor' : '0=0', { cursor })
        .orderBy('comment.id', 'ASC')
        .take(limit)
        .getMany();

      let hasNextPage = false;
      if (comment.length > limit) {
        hasNextPage = true;
        comment.pop();
      }

      return {
        data: comment,
        hasNextPage,
      };
    } catch (error) {
      console.log('게시글 댓글 조회 error::: ', error);
      throw new InternalServerErrorException();
    }
  }

  /** 댓글 수정 */
  async updateComment(body: UpdateCommentDto, commentId: number) {
    const commentInfo = {
      ...body,
    };

    const updateComment = plainToInstance(Comment, commentInfo);
    await this.commentRepository.update({ id: commentId }, updateComment);
    return await this.findCommentById(commentId);
  }

  /** 댓글 삭제 */
  async deleteComment(commentId: number) {
    await this.commentRepository.delete({ id: commentId });

    return true;
  }
}
