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

  /** 카테고리 아이디로 찾기 */
  async findCategorybyId(categoryId) {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      throw new HttpException('해당 카테고리가 없습니다.', 400);
    }
    return category;
  }

  /** 카테고리 이름 찾기 */
  async findCategorybyName(name) {
    const category = await this.categoryRepository.findOne({
      where: { name },
    });

    if (category) {
      throw new HttpException('중복된 카테고리 이름이 있습니다.', 400);
    }
    return category;
  }

  /** 카테고리 생성 */
  async createCategory(body: CreateCategoryDTO) {
    const { name, content } = body;

    await this.findCategorybyName(name);

    const category = await this.categoryRepository.save({
      name,
      content,
    });

    return category;
  }

  /** 카테고리 보기 */
  async findAllCategory(page = 1) {
    const take = 10;

    const [category, total] = await this.categoryRepository.findAndCount({
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

  /** 카테고리 상세 보기 */
  async findCategory(categoryId) {
    return await this.findCategorybyId(categoryId);
  }

  /** 카테고리 수정 */
  async updateCategory(categoryId, body) {
    await this.findCategorybyId(categoryId);

    await this.categoryRepository.update({ id: categoryId }, body);
    return await this.findCategorybyId(categoryId);
  }

  /** 카테고리 삭제 */
  async deleteCategory(categoryId) {
    await this.findCategorybyId(categoryId);

    await this.categoryRepository.delete({ id: categoryId });
    return true;
  }
}
