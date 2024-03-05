import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateLikeDto {
  @ApiProperty({
    example: true,
    description: '',
  })
  @IsNotEmpty()
  @IsBoolean()
  is_like: boolean;
}
