import { CreateCategoryDTO } from '@category/dto/category.create.dto';
import { Category } from '@category/model/category.entity';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  //** 카테고리 아이디로 찾기 */
  async findCategorybyId(categoryId) {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      throw new HttpException('해당 메뉴가 없습니다.', 400);
    }
    return category;
  }

  //** 카테고리 이름 찾기 */

  //** 카테고리 생성 */
  async createCategory(body: CreateCategoryDTO) {
    const { name, content } = body;

    // 이름 중복체크

    const category = await this.categoryRepository.save({
      name,
      content,
    });

    return category;
  }

  //** 카테고리 보기 */
  async findAllCategory() {
    const category = await this.categoryRepository.find();

    return category;
  }

  //** 카테고리 상세 보기 */
  async findCategory(categoryId) {
    return await this.findCategorybyId(categoryId);
  }

  //** 카테고리 수정 */

  //** 카테고리 삭제 */
}
