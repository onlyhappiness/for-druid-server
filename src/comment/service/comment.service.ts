import { Comment } from '@comment/model/comment.entity';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '@user/model/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly CommentRepository: Repository<Comment>,
  ) {}

  //** 댓글 보기 */
  async findComment(communityId: number) {
    const comment = await this.CommentRepository.find({
      relations: ['Community'],
      where: { Community: { id: communityId } },
    });

    if (!comment) {
      throw new HttpException('해당 댓글이 없습니다.', 400);
    }
    return comment;
  }

  //** 댓글 작성 */
  async createComment(communityId, currentUser: Users, body) {
    console.log({ communityId, currentUser, body });
  }

  //** 댓글 수정 */

  //** 댓글 삭제 */
}
