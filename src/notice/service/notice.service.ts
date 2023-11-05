import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNoticeDTO } from '@notice/dto/create.notice.dto';
import { UpdateNoticeDTO } from '@notice/dto/update.notice.dto';
import { Notice } from '@notice/model/notice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
  ) {}

  /** 공지사항 아이디로 찾기 */
  async findNoticeById(noticeId: number) {
    const notice = await this.noticeRepository.findOne({
      where: { id: noticeId },
    });

    if (!notice) {
      throw new HttpException('존재하지 않는 공지사항입니다.', 400);
    }
    return notice;
  }

  /** 공지사항 전체보기 */
  async findAllNotice(page, limit) {
    const queryBuilder = this.noticeRepository.createQueryBuilder('notice');

    try {
      const notice = await queryBuilder
        .skip(limit * (page - 1))
        .take(limit)
        .getMany();

      return notice;
    } catch {
      throw new InternalServerErrorException();
    }
  }

  /** 공지사항 상세 */
  async findNotice(noticeId: number) {
    return await this.findNoticeById(noticeId);
  }

  /** 공지사항 생성 */
  async createNotice(body: CreateNoticeDTO) {
    const notice = await this.noticeRepository.save(body);

    return notice;
  }

  /** 공지사항 수정 */
  async updateNotice(noticeId: number, body: UpdateNoticeDTO) {
    await this.findNoticeById(noticeId);

    await this.noticeRepository.update({ id: noticeId }, body);
    return await this.findNoticeById(noticeId);
  }

  /** 공지사항 삭제 */
  async delteNotice(noticeId) {
    await this.findNoticeById(noticeId);

    await this.noticeRepository.delete({ id: noticeId });
    return true;
  }
}
