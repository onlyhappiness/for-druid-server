import { Community } from '@community/model/community.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(Community)
    private readonly communityRepository: Repository<Community>,
  ) {}

  //** 커뮤니티 아이디로 찾기 */
  async findCommunityById() {
    return '커뮤니티';
  }

  //** 커뮤니티 전체보기 */
  async findAllCommunity() {
    return '커뮤니티 전체보기';
  }

  //** 커뮤니티 상세 */
  async findCommunity() {
    return '커뮤니티';
  }

  //** 커뮤니티 생성 */
  async createCommunity() {
    return '커뮤니티 생성';
  }
}
