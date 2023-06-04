import { JwtAuthGuard } from '@auth/jwt/jwt.guard';
import { CurrentUser } from '@common/decorators/user.decorator';
import { CreateFavoriteDTO } from '@favorite/dto/create.favorite.dto';
import { FavoriteService } from '@favorite/service/favorite.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Users } from '@user/model/user.entity';

@ApiTags('Favorite')
@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @ApiOperation({ summary: '찜한 커뮤니티 보기' })
  @Get()
  async findFavorite() {
    return this.favoriteService.findAllFavorite();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '찜하기' })
  @ApiBody({
    type: CreateFavoriteDTO,
  })
  @Post()
  async createFavorite(
    @CurrentUser() CurrentUser: Users,
    @Body() body: CreateFavoriteDTO,
  ) {
    return this.favoriteService.createFavorite(CurrentUser, body);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '찜한 커뮤니티 삭제' })
  @Delete('/:favoriteId')
  async deleteFavorite(
    @Param('favoriteId') favoriteId: number,
    @CurrentUser() currentUser: Users,
  ) {
    return this.favoriteService.deleteFavorite(favoriteId, currentUser);
  }
}
