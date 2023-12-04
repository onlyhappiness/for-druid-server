import { ApiProperty } from '@nestjs/swagger';
import { Users } from '@user/model/user.entity';
import { IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ChatRoom } from './chat-room.entity';

@Entity({ name: 'chat_message' })
export class ChatMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 채팅방
  @ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.ChatMessage, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  ChatRoom: ChatRoom;

  // 발신 유저
  @ManyToOne(() => Users, (user) => user.ChatMessage, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  Users: Users;

  @ApiProperty({
    description: '메시지',
    example: '',
  })
  @IsString()
  @Column()
  message: string;
}
