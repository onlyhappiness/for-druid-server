import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateCommunityDTO {
  @ApiProperty({
    example: '제목',
    description: '제목',
  })
  title: string;

  @ApiProperty({
    example: '내용',
    description: '내용',
  })
  content: string;

  @ApiProperty({
    example: '이미지',
    description: '이미지',
  })
  image: string;

  @ApiProperty({
    example: 1,
    description: '카테고리 아이디',
  })
  @IsNotEmpty()
  @IsInt()
  categoryId: number;
}
