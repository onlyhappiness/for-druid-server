import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBoardDto {
  @ApiProperty({
    example: '',
    description: '',
  })
  @IsNotEmpty()
  @IsString()
  content: string;
}
