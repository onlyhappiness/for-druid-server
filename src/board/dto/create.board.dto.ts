import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBoardDto {
  //   @ApiProperty({
  //     example: 1,
  //     description: '유저 id',
  //   })
  //   @IsNotEmpty()
  //   @IsInt()
  //   user_id: number;

  @ApiProperty({
    example: '',
    description: '',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
