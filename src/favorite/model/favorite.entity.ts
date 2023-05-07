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

@Entity({ name: 'favorite' })
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 커뮤니티
  @ManyToOne(() => Community, (community) => community.Favorite, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  Community: Community;

  // 유저
  @ManyToOne(() => Users, (users) => users.Favorite, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  Users: Users;
}
