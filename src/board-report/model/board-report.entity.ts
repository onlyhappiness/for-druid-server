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

@Entity({ name: 'board-report' })
export class BoardReport {
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

  @ManyToOne(() => Board, (board) => board.BoardReport, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'board_id', referencedColumnName: 'id' })
  Board: Board;

  @ManyToOne(() => Users, (user) => user.BoardReport, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  User: Users;
}
