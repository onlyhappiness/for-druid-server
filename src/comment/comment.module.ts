import { Board } from '@board/model/board.enttiy';
import { BoardService } from '@board/service/board.service';
import { Like } from '@like/model/like.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './controller/comment.controller';
import { Comment } from './model/comment.entity';
import { CommentService } from './service/comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Board, Like])],
  controllers: [CommentController],
  providers: [CommentService, BoardService],
  exports: [CommentService],
})
export class CommentModule {}
