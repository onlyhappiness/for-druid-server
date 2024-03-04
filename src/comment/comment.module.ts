import { Module } from '@nestjs/common';
import { CommentController } from './controller/comment.controller';
import { CommentService } from './service/comment.service';

@Module({
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
