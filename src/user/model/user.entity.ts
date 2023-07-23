import { Comment } from '@comment/model/comment.entity';
import { Community } from '@community/model/community.entity';
import { Favorite } from '@favorite/model/favorite.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Inquiry } from 'src/inquiry/model/inquiry.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    example: '빵입니다',
    description: '이름',
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  name: string;

  @ApiProperty({
    example: 'bread',
    description: '닉네임',
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  nickname: string;

  // @ApiProperty({
  //   example: 'bread11@gmail.com',
  //   description: '이메일',
  // })
  // @IsString()
  // @IsNotEmpty()
  // @Column()
  // email: string;

  @ApiProperty({
    example: '01012345678',
    description: '전화번호',
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  phone: string;

  @ApiProperty({
    example: 'test1234!',
    description: '비밀번호',
  })
  @IsString()
  @IsNotEmpty()
  @Column({ select: false })
  password: string;

  @IsString()
  @Column({ nullable: true })
  image: string | null;

  // 댓글
  @OneToMany(() => Comment, (comment) => comment.Users)
  Comment: Comment;

  // 커뮤니티
  @OneToMany(() => Community, (community) => community.Users)
  Community: Community;

  // 찜
  @OneToMany(() => Favorite, (favorite) => favorite.Users)
  Favorite: Favorite;

  // 문의
  @OneToMany(() => Inquiry, (inquiry) => inquiry.Users)
  Inquiry: Inquiry;
}
