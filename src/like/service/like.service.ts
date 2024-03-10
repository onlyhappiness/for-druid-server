import { CreateLikeDto } from '@like/dto/create.like.dto';
import { Like } from '@like/model/like.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '@user/model/user.entity';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
  ) {}

  /** 좋아요 찾기 */
  async findLikebyUser(userId: number, boardId: number) {
    const like = await this.likeRepository.findOne({
      relations: ['User', 'Board'],
      where: { User: { id: userId }, Board: { id: boardId } },
    });

    if (!like) {
      throw new NotFoundException('해당 게시글에 좋아요를 하지 않았습니다.');
    }
    return like;
  }

  /** 게시글 좋아요 */
  async createLike(currentUser: Users, body: CreateLikeDto, boardId: number) {
    const { id: userId } = currentUser;

    const { is_like } = body;

    if (is_like) {
      const likeInfo = {
        User: userId,
        Board: boardId,
      };
      const createLike = plainToInstance(Like, likeInfo);
      const like = await this.likeRepository.save(createLike);

      return like;
    } else {
      const like = await this.findLikebyUser(userId, boardId);

      await this.likeRepository.delete({ id: like.id });

      return true;
    }
  }
}
