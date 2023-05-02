import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 이름
  @ApiProperty({
    example: '빵입니다',
    description: '이름',
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  name: string;

  @ApiProperty({
    example: 'bread',
    description: '닉네임',
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  nickname: string;

  // 이메일
  @ApiProperty({
    example: 'bread11@gmail.com',
    description: '이메일',
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  email: string;

  // 비밀번호
  @ApiProperty({
    example: 'test1234!',
    description: '비밀번호',
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  password: string;
}
