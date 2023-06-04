import { AuthService } from '@auth/service/auth.service';
import { CommunityService } from '@community/service/community.service';
import { CreateFavoriteDTO } from '@favorite/dto/create.favorite.dto';
import { Favorite } from '@favorite/model/favorite.entity';
import { HttpException, Injectable } from '@nestjs/common';
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

  //** 찜 유저 찾기 */
  async findFavoriteByUser(favoriteId, userId) {
    console.log('favoriteId: ', favoriteId);
    console.log('userId: ', userId);

    const favorite = await this.FavoriteRepository.findOne({
      relations: ['Users'],
      where: { id: favoriteId, Users: { id: userId } },
    });

    if (!favorite) {
      throw new HttpException('존재하지 않는 게시글입니다.', 400);
    }
    return favorite;
  }

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
  async deleteFavorite(favoriteId, currentUser) {
    const { id: userId } = currentUser;
    await this.findFavoriteByUser(favoriteId, userId);
    await this.FavoriteRepository.delete({ id: favoriteId });

    return true;
  }
}
