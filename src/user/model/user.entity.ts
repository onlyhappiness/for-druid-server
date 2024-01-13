import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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

  @ApiProperty({
    example: '',
    description: '닉네임',
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  nickname: string;

  @ApiProperty({
    example: '',
    description: '이메일',
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  email: string;

  @ApiProperty({
    example: '',
    description: '전화번호',
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  phone: string;

  @ApiProperty({
    example: '',
    description: '비밀번호',
  })
  @IsString()
  @IsNotEmpty()
  @Column({ select: false })
  password: string;

  @IsString()
  @Column({ nullable: true })
  image: string | null;
}
