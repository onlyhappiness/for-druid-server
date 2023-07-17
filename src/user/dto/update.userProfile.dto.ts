import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserProfileDTO {
  @ApiProperty({
    example: '이미지',
    description: '이미지 url',
  })
  image: string;
}
