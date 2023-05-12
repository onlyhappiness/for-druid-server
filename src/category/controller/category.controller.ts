import { JwtAuthGuard } from '@auth/jwt/jwt.guard';
import { CreateCategoryDTO } from '@category/dto/category.create.dto';
import { UpdateCategoryDTO } from '@category/dto/category.update.dto';
import { CategoryService } from '@category/service/category.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('CATEGORY')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: '카테고리 보기' })
  @ApiParam({
    name: 'page',
    required: true,
    description: '요청할 페이지',
    example: 1,
  })
  @Get()
  async findAllCategory(@Query('page') page = 1) {
    return await this.categoryService.findAllCategory(page);
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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '카테고리 생성' })
  @ApiBody({
    type: CreateCategoryDTO,
  })
  @Post()
  async createCategory(@Body() body: CreateCategoryDTO) {
    return await this.categoryService.createCategory(body);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '카테고리 수정' })
  @ApiParam({
    name: 'categoryId',
    required: true,
    description: '카테고리 아이디',
    type: 'string',
  })
  @ApiBody({
    type: UpdateCategoryDTO,
  })
  @Put('/:categoryId')
  async updateCategory(
    @Param('categoryId') categoryId: string,
    @Body() body: UpdateCategoryDTO,
  ) {
    return await this.categoryService.updateCategory(categoryId, body);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '카테고리 삭제' })
  @ApiParam({
    name: 'categoryId',
    required: true,
    description: '카테고리 아이디',
    type: 'string',
  })
  @Delete('/:categoryId')
  async deleteCategory(@Param('categoryId') categoryId: string) {
    return await this.categoryService.deleteCategory(categoryId);
  }
}
