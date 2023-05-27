import { FavoriteService } from '@favorite/service/favorite.service';
import { Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Favorite')
@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @ApiOperation({ summary: '찜한 커뮤니티 보기' })
  @Get()
  async findFavorite() {
    return '찜한 커뮤니티 보기';
  }

  @ApiOperation({ summary: '찜하기' })
  @Post()
  async createFavorite() {
    return '찜하기';
  }

  @ApiOperation({ summary: '찜한 커뮤니티 삭제' })
  @Delete()
  async deleteFavorite() {
    return '찜한 커뮤니티 삭제';
  }
}
