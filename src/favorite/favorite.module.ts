import { Module } from '@nestjs/common';
import { FavoriteController } from './controller/favorite.controller';
import { FavoriteService } from './service/favorite.service';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
