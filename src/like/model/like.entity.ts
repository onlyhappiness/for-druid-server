import { Board } from '@board/model/board.enttiy';
import { Users } from '@user/model/user.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'like' })
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 유저
  @ManyToOne(() => Users, (user) => user.Like, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  User: Users;

  // 게시글
  @ManyToOne(() => Board, (board) => board.Like, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'board_id', referencedColumnName: 'id' })
  Board: Board;
}
