import { Favorite } from '@favorite/model/favorite.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly FavoriteRepository: Repository<Favorite>,
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
  async createFavorite() {
    return '찜하기';
  }

  //** 찜 삭제 */
  async deleteFavorite() {
    return '찜 삭제';
  }
}
