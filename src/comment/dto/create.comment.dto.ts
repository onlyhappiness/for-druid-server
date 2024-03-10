import { Comment } from '@comment/model/comment.entity';
import { PickType } from '@nestjs/swagger';

export class CreateCommentDto extends PickType(Comment, ['content'] as const) {}
