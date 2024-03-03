import { LikeModule } from '@like/like.module';
import { Like } from '@like/model/like.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from './controller/board.controller';
import { Board } from './model/board.enttiy';
import { BoardService } from './service/board.service';

@Module({
  imports: [TypeOrmModule.forFeature([Board, Like]), LikeModule],
  controllers: [BoardController],
  providers: [BoardService],
  exports: [BoardService],
})
export class BoardModule {}
