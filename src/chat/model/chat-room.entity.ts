import { Users } from '@user/model/user.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ChatMessage } from './chat-message.entity';

@Entity({ name: 'chat_room' })
export class ChatRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Users, (user) => user.ChatRoom, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  Users: Users;

  // 채팅 메시지
  @OneToMany(() => ChatMessage, (chatMessage) => chatMessage.ChatRoom)
  ChatMessage: ChatMessage;
}
