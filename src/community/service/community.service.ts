import { CreateCommunityDTO } from '@community/dto/create.community.dto';
import { Community } from '@community/model/community.entity';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '@user/model/user.entity';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(Community)
    private readonly communityRepository: Repository<Community>,
  ) {}

  //** 커뮤니티 아이디로 찾기 */
  async findCommunityById(communityId) {
    const community = await this.communityRepository.findOne({
      where: { id: communityId },
    });

    if (!community) {
      throw new HttpException('존재하지 않는 게시글입니다.', 400);
    }
    return community;
  }

  //** 커뮤니티 전체보기 */
  async findAllCommunity(page = 1) {
    const take = 10;

    const [category, total] = await this.communityRepository.findAndCount({
      take,
      skip: (page - 1) * take,
    });

    return {
      data: category,
      meta: {
        total,
        page,
        last_page: Math.ceil(total / take),
      },
    };
  }

  //** 커뮤니티 상세 */
  async findCommunity(communityId: number) {
    return await this.findCommunityById(communityId);
  }

  //** 커뮤니티 생성 */
  async createCommunity(user: Users, body: CreateCommunityDTO) {
    const { id: userId } = user;

    const { categoryId } = body;

    // 유저 찾기
    // 카테고리 찾기

    const communityInfo = {
      Users: userId,
      Category: categoryId,
      ...body,
    };
    const createCommunity = plainToInstance(Community, communityInfo);
    const community = await this.communityRepository.save(createCommunity);

    return community;
  }
}
