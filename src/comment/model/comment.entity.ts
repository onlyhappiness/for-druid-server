import { Community } from '@community/model/community.entity';
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

@Entity({ name: 'comment' })
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 유저
  @ManyToOne(() => Users, (user) => user.Comment, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  Users: Users;

  // 커뮤니티
  @OneToMany(() => Community, (community) => community.Comment)
  Community: Community;
}
