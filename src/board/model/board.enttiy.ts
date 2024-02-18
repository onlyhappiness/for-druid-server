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
    description: '',
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  description: string;

  // 유저
  @ManyToOne(() => Users, (user) => user.Board, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  User: Users;
}
