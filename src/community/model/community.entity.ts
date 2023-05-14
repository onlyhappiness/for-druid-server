import { Category } from '@category/model/category.entity';
import { Comment } from '@comment/model/comment.entity';
import { Favorite } from '@favorite/model/favorite.entity';
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

@Entity({ name: 'community' })
export class Community {
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

  // 카테고리
  @ManyToOne(() => Category, (category) => category.Community, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  Category: Category;

  // 유저
  @ManyToOne(() => Users, (users) => users.Community, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  Users: Users;

  // 댓글
  @OneToMany(() => Comment, (comment) => comment.Community)
  Comment: Comment;

  // 찜
  @OneToMany(() => Favorite, (favorite) => favorite.Community)
  Favorite: Favorite;
}
