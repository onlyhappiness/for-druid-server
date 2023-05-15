import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommunityDTO {
  @ApiProperty({
    example: '제목',
    description: '제목',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: '내용',
    description: '내용',
  })
  @IsString()
  @IsNotEmpty()
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

  //   @ApiProperty({
  //     example: 1,
  //     description: '유저 아이디',
  //   })
  //   @IsNotEmpty()
  //   @IsInt()
  //   userId: number;
}
