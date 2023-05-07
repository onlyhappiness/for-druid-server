import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'event' })
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    example: '제목',
    description: '제목',
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  title: string;

  @ApiProperty({
    example: '내용',
    description: '내용',
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  content: string;

  @ApiProperty({
    example: '이미지',
    description: '이미지',
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  image: string;
}
