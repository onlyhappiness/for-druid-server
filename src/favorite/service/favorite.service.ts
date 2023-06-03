import { AuthService } from '@auth/service/auth.service';
import { CommunityService } from '@community/service/community.service';
import { CreateFavoriteDTO } from '@favorite/dto/create.favorite.dto';
import { Favorite } from '@favorite/model/favorite.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '@user/model/user.entity';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly FavoriteRepository: Repository<Favorite>,
    private readonly authService: AuthService,
    private readonly communityService: CommunityService,
  ) {}

  //** 찜 아이디로 찜 찾기 */
  async findFavoriteById(favoriteId) {
    return '찜 찾기';
  }

  //** 찜한 목록 보기 */
  async findAllFavorite() {
    return '찜한 목록 찾기';
  }

  //** 찜하기 */
  async createFavorite(currentUser: Users, body: CreateFavoriteDTO) {
    const { id: userId } = currentUser;
    const { communityId } = body;

    await this.authService.findUserById(userId);
    await this.communityService.findCommunityById(communityId);

    const favoriteInfo = {
      Users: userId,
      Community: communityId,
    };

    const createFavorite = plainToInstance(Favorite, favoriteInfo);
    const favorite = await this.FavoriteRepository.save(createFavorite);
    return favorite;
  }

  //** 찜 삭제 */
  async deleteFavorite() {
    return '찜 삭제';
  }
}
