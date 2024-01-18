import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'email_verification' })
export class EmailVerification {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    example: '',
    description: '이메일',
  })
  @IsEmail()
  @Column()
  to: string;

  @ApiProperty({
    example: '',
    description: '인증코드',
  })
  @IsNumber()
  @Column()
  code: number;

  @ApiProperty({
    example: '',
    description: '인증 시도 횟수',
  })
  @IsNumber()
  @Column()
  count: number;
}
