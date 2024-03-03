import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBoardDto {
  @ApiProperty({
    example: '',
    description: '',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
