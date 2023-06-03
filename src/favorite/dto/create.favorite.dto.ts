import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateFavoriteDTO {
  @ApiProperty({
    example: 1,
    description: '커뮤니티 아이디',
  })
  @IsNotEmpty()
  @IsInt()
  communityId: number;
}
