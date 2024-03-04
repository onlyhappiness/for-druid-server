import { Board } from '@board/model/board.enttiy';
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

@Entity({ name: 'comment' })
export class Comment {
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

  // 유저
  @ManyToOne(() => Users, (user) => user.Comment, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  User: Users;

  // 게시글
  @ManyToOne(() => Board, (board) => board.Comment, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'board_id', referencedColumnName: 'id' })
  Board: Board;
}
