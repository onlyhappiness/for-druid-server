import { IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'board_image' })
export class BoardImage {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @IsString()
  @Column({ type: 'varchar' })
  hash: string;

  @IsString()
  @Column({ type: 'varchar' })
  url: string;
}
