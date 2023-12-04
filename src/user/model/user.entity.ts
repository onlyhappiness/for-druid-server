import { ChatMessage } from '@chat/model/chat-message.entity';
import { ChatRoom } from '@chat/model/chat-room.entity';
import { Comment } from '@comment/model/comment.entity';
import { Community } from '@community/model/community.entity';
import { Favorite } from '@favorite/model/favorite.entity';
import { Inquiry } from '@inquiry/model/inquiry.entity';
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

@Entity({ name: 'user' })
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    example: '',
    description: '이름',
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  name: string;

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

  // 채팅방
  @OneToMany(() => ChatRoom, (chatRoom) => chatRoom.Users)
  ChatRoom: ChatRoom;

  // 채팅 메시지
  @OneToMany(() => ChatMessage, (chatMessage) => chatMessage.Users)
  ChatMessage: ChatMessage;
}
