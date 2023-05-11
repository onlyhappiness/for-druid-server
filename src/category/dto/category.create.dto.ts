import { Category } from '@category/model/category.entity';
import { PickType } from '@nestjs/swagger';

export class CreateCategoryDTO extends PickType(Category, [
  'name',
  'content',
] as const) {}
