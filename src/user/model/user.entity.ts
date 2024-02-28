import { Board } from '@board/model/board.enttiy';
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
  @Column()
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
  @Column()
  phone: string;

  @ApiProperty({
    example: '',
    description: '비밀번호',
  })
  @IsString()
  @IsNotEmpty()
  @Column({ select: false })
  password: string;

  @IsString()
  @Column({ nullable: true })
  image?: string;

  // 게시글
  @OneToMany(() => Board, (board) => board.User)
  Board: Board;

  // 좋아요
  @OneToMany(() => Like, (like) => like.User)
  Like: Like;
}
