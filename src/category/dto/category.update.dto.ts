import { Category } from '@category/model/category.entity';
import { PickType } from '@nestjs/swagger';

export class UpdateCategoryDTO extends PickType(Category, [
  'name',
  'content',
] as const) {}
