import { JwtAuthGuard } from '@auth/jwt/jwt.guard';
import { CurrentUser } from '@common/decorators/user.decorator';
import { CreateFavoriteDTO } from '@favorite/dto/create.favorite.dto';
import { FavoriteService } from '@favorite/service/favorite.service';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Users } from '@user/model/user.entity';

@ApiTags('Favorite')
@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  @ApiOperation({ summary: '찜한 커뮤니티 보기' })
  @ApiQuery({ name: 'page', description: '설정 안 할 경우 기본값 1' })
  @ApiQuery({ name: 'limit', description: '설정 안 할 경우 기본값 15' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findFavorite(
    @CurrentUser() currentUser: Users,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(15), ParseIntPipe) limit: number,
  ) {
    return this.favoriteService.findAllFavorite(currentUser, page, limit);
  }

  @Post()
  @ApiOperation({ summary: '찜하기' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    type: CreateFavoriteDTO,
  })
  async createFavorite(
    @CurrentUser() CurrentUser: Users,
    @Body() body: CreateFavoriteDTO,
  ) {
    return this.favoriteService.createFavorite(CurrentUser, body);
  }

  @Delete('/:favoriteId')
  @ApiOperation({ summary: '찜한 커뮤니티 삭제' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async deleteFavorite(
    @Param('favoriteId') favoriteId: number,
    @CurrentUser() currentUser: Users,
  ) {
    return this.favoriteService.deleteFavorite(favoriteId, currentUser);
  }
}
