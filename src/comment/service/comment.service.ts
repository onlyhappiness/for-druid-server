import { AuthService } from '@auth/service/auth.service';
import { CreateCommentDTO } from '@comment/dto/create.comment.dto';
import { Comment } from '@comment/model/comment.entity';
import { CommunityService } from '@community/service/community.service';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '@user/model/user.entity';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly CommentRepository: Repository<Comment>,
    private readonly authService: AuthService,
    private readonly communityService: CommunityService,
  ) {}

  //** 댓글 아이디로 댓글 찾기 */
  async findCommentById(commentId) {
    const comment = await this.CommentRepository.findOne({
      relations: ['Users', 'Community'],
      where: { id: commentId },
    });

    if (!comment) {
      throw new HttpException('해당 댓글을 찾을 수 없습니다.', 400);
    }
    return comment;
  }

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
  async createComment(
    communityId: number,
    currentUser: Users,
    body: CreateCommentDTO,
  ) {
    const { id: userId } = currentUser;
    await this.authService.findUserById(userId);
    await this.communityService.findCommunityById(communityId);

    const commentInfo = {
      Users: userId,
      Community: communityId,
      ...body,
    };
    const createComment = plainToInstance(Comment, commentInfo);
    const comment = await this.CommentRepository.save(createComment);
    return comment;
  }

  //** 댓글 수정 */
  async updateComment(commentId: number, body) {
    console.log('commentId: ', commentId);
    console.log('body: ', body);

    await this.findCommentById(commentId);

    const commentInfo = {
      ...body,
    };
    const updateComment = plainToInstance(Comment, commentInfo);
    await this.CommentRepository.update({ id: commentId }, updateComment);
    return await this.findCommentById(commentId);
  }

  //** 댓글 삭제 */
  async deleteComment() {
    return '댓글 삭제';
  }
}
