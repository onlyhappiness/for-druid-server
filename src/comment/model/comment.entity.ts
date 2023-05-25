import { Community } from '@community/model/community.entity';
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

@Entity({ name: 'comment' })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    example: '내용',
    description: '내용',
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  content: string;

  // 유저
  @ManyToOne(() => Users, (user) => user.Comment, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  Users: Users;

  // 커뮤니티
  @ManyToOne(() => Community, (community) => community.Comment, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  Community: Community;
}
