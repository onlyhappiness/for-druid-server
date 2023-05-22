import { AuthService } from '@auth/service/auth.service';
import { CategoryService } from '@category/service/category.service';
import { CreateCommunityDTO } from '@community/dto/create.community.dto';
import { UpdateCommunityDTO } from '@community/dto/update.community.dto';
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
    private readonly authService: AuthService,
    private readonly categoryService: CategoryService,
  ) {}

  //** 커뮤니티 작성자 확인 */
  async findCommunityByUser(communityId, userId) {
    const community = await this.communityRepository.findOne({
      relations: ['Users'],
      where: { id: communityId, Users: { id: userId } },
    });

    if (!community) {
      throw new HttpException('해당 게시글의 작성자가 아닙니다.', 400);
    }
    return community;
  }

  //** 커뮤니티 아이디로 찾기 */
  async findCommunityById(communityId) {
    const community = await this.communityRepository.findOne({
      where: { id: communityId },
      relations: ['Users', 'Category'],
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

    await this.authService.findUserById(userId);
    await this.categoryService.findCategorybyId(categoryId);

    const communityInfo = {
      Users: userId,
      Category: categoryId,
      ...body,
    };

    const createCommunity = plainToInstance(Community, communityInfo);
    const community = await this.communityRepository.save(createCommunity);
    return community;
  }

  //** 커뮤니티 수정 */
  async updateCommunity(
    communityId: number,
    currentUser: Users,
    body: UpdateCommunityDTO,
  ) {
    console.log('ndalkndlandland: ', communityId);

    const { id: userId } = currentUser;
    const { categoryId, title, content, image } = body;

    await this.findCommunityByUser(communityId, userId);
    await this.categoryService.findCategorybyId(categoryId);

    const communityInfo = {
      Users: userId,
      Category: categoryId,
      title,
      content,
      image,
    };

    const updateCommunity = plainToInstance(Community, communityInfo);
    await this.communityRepository.update({ id: communityId }, updateCommunity);
    return await this.findCommunity(communityId);
  }

  //** 커뮤니티 삭제 */
  async deleteCommunity(communityId: number, currentUser: Users) {
    // NOTE: NOTE
    // FIXME: FIXME
    // TODO: TODO
    const { id: userId } = currentUser;

    await this.findCommunityByUser(communityId, userId);

    await this.communityRepository.delete({ id: communityId });

    return true;
  }
}
