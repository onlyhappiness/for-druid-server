import { BoardReport } from '@board-report/model/board-report.entity';
import { Comment } from '@comment/model/comment.entity';
import { Like } from '@like/model/like.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Users } from '@user/model/user.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'board' })
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    example: '',
    description: '내용',
  })
  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', comment: '내용' })
  content: string;

  @Column('text', { array: true, nullable: true, default: [] })
  images?: string[];

  // 유저
  @ManyToOne(() => Users, (user) => user.Board, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  User: Users;

  // 좋아요
  @OneToMany(() => Like, (like) => like.Board)
  Like: Like;

  // 댓글
  @OneToMany(() => Comment, (comment) => comment.Board)
  Comment: Comment;

  // 신고
  @OneToMany(() => BoardReport, (report) => report.Board)
  BoardReport: BoardReport;
}
