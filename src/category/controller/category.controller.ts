import { JwtAuthGuard } from '@auth/jwt/jwt.guard';
import { CreateCategoryDTO } from '@category/dto/category.create.dto';
import { UpdateCategoryDTO } from '@category/dto/category.update.dto';
import { CategoryService } from '@category/service/category.service';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: '카테고리 보기' })
  @ApiQuery({
    name: 'page',
    required: true,
    description: '설정 안 할 경우 기본값 1',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: true,
    description: '설정 안 할 경우 기본값 15',
    example: 15,
  })
  async findAllCategory(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(15), ParseIntPipe) limit: number,
  ) {
    return await this.categoryService.findAllCategory(page, limit);
  }

  @Get('/:categoryId')
  @ApiOperation({ summary: '카테고리 상세' })
  @ApiParam({
    name: 'categoryId',
    required: true,
    description: '카테고리 아이디',
    type: 'number',
  })
  async findCategory(@Param('categoryId') categoryId: number) {
    return await this.categoryService.findCategory(categoryId);
  }

  @Post()
  @ApiOperation({ summary: '카테고리 생성' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    type: CreateCategoryDTO,
  })
  async createCategory(@Body() body: CreateCategoryDTO) {
    return await this.categoryService.createCategory(body);
  }

  @Put('/:categoryId')
  @ApiOperation({ summary: '카테고리 수정' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'categoryId',
    required: true,
    description: '카테고리 아이디',
    type: 'number',
  })
  @ApiBody({
    type: UpdateCategoryDTO,
  })
  async updateCategory(
    @Param('categoryId') categoryId: number,
    @Body() body: UpdateCategoryDTO,
  ) {
    return await this.categoryService.updateCategory(categoryId, body);
  }

  @Delete('/:categoryId')
  @ApiOperation({ summary: '카테고리 삭제' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiParam({
    name: 'categoryId',
    required: true,
    description: '카테고리 아이디',
    type: 'number',
  })
  async deleteCategory(@Param('categoryId') categoryId: number) {
    return await this.categoryService.deleteCategory(categoryId);
  }
}
