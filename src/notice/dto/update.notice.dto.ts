import { PickType } from '@nestjs/swagger';
import { Notice } from '@notice/model/notice.entity';

export class UpdateNoticeDTO extends PickType(Notice, [
  'title',
  'content',
] as const) {}
