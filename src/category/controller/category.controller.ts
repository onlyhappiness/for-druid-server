import { JwtAuthGuard } from '@auth/jwt/jwt.guard';
import { CreateCategoryDTO } from '@category/dto/category.create.dto';
import { CategoryService } from '@category/service/category.service';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('CATEGORY')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: '카테고리 보기' })
  @Get()
  async findAllCategory() {
    return await this.categoryService.findAllCategory();
  }

  @ApiOperation({ summary: '카테고리 상세' })
  @ApiParam({
    name: 'categoryId',
    required: true,
    description: '카테고리 아이디',
    type: 'string',
  })
  @Get('/:categoryId')
  async findCategory(@Param('categoryId') categoryId: number) {
    return await this.categoryService.findCategory(categoryId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '카테고리 생성' })
  @ApiBody({
    type: CreateCategoryDTO,
  })
  @Post()
  async createCategory(@Body() body: CreateCategoryDTO) {
    return await this.categoryService.createCategory(body);
  }
}
