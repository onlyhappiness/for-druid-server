import { Comment } from '@comment/model/comment.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Users } from '@user/model/user.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'inquiry' })
export class Inquiry {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    example: '',
    description: '제목',
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  title: string;

  @ApiProperty({
    example: '',
    description: '내용',
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  content: string;

  // 유저
  @ManyToOne(() => Users, (users) => users.Inquiry, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  Users: Users;

  // 댓글
  @ManyToOne(() => Comment, (comment) => comment.Inquiry, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  Comment: Comment;
}
