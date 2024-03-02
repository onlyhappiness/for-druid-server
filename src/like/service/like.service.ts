import { Like } from '@like/model/like.entity';
import { Injectable } from '@nestjs/common';
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

  /** */
  async createLike(currentUser: Users, boardId: number) {
    const { id: userId } = currentUser;

    const likeInfo = {
      User: userId,
      Board: boardId,
    };
    const createLike = plainToInstance(Like, likeInfo);
    const like = await this.likeRepository.save(createLike);

    return like;
  }
}
