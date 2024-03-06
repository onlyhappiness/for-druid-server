import { Comment } from '@comment/model/comment.entity';
import { PickType } from '@nestjs/swagger';

export class UpdateCommentDto extends PickType(Comment, ['content'] as const) {}
