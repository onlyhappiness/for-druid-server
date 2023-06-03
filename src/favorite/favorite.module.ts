import { Module } from '@nestjs/common';
import { FavoriteController } from './controller/favorite.controller';
import { FavoriteService } from './service/favorite.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './model/favorite.entity';
import { CommunityModule } from '@community/community.module';
import { AuthModule } from '@auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite]), CommunityModule, AuthModule],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
