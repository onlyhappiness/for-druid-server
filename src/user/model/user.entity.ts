import { BoardReport } from '@board-report/model/board-report.entity';
import { Board } from '@board/model/board.enttiy';
import { Comment } from '@comment/model/comment.entity';
import { Like } from '@like/model/like.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserImage } from './user-image.entity';

export enum LoginType {
  SIGNNAME = 'SIGNNAME',
  GOOGLE = 'GOOGLE',
}

@Entity({ name: 'user' })
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    example: 'SIGNNAME',
    description: '로그인 타입',
  })
  @IsNotEmpty()
  @Column({
    type: 'enum',
    enum: LoginType,
    default: LoginType.SIGNNAME,
  })
  loginType: LoginType;

  @ApiProperty({
    example: '',
    description: '닉네임',
  })
  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', comment: '닉네임' })
  signname: string;

  // @ApiProperty({
  //   example: '',
  //   description: '이메일',
  // })
  // @IsString()
  // @IsNotEmpty()
  // @Column()
  // email: string;

  @ApiProperty({
    example: '',
    description: '전화번호',
  })
  @IsString()
  @IsNotEmpty()
  @Column({ type: 'varchar', comment: '전화번호' })
  phone: string;

  @ApiProperty({
    example: '',
    description: '비밀번호',
  })
  @IsString()
  @IsNotEmpty()
  @Column({ select: false, type: 'varchar', comment: '비밀번호' })
  password: string;

  // @IsString()
  // @Column({
  //   nullable: true,
  //   type: 'varchar',
  //   comment: '이미지',
  //   default: 'https://druid-diary.s3.ap-northeast-2.amazonaws.com/logo',
  // })
  // image?: string;
  // 이미지
  @OneToMany(() => UserImage, (image) => image.User)
  Image: UserImage;

  // 게시글
  @OneToMany(() => Board, (board) => board.User)
  Board: Board;

  // 좋아요
  @OneToMany(() => Like, (like) => like.User)
  Like: Like;

  // 댓글
  @OneToMany(() => Comment, (comment) => comment.User)
  Comment: Comment;

  // 게시글 신고
  @OneToMany(() => BoardReport, (report) => report.User)
  BoardReport: BoardReport;
}
