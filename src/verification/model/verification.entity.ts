import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum VerificationType {
  SMS = 'SMS',
}

@Entity({ name: 'verification' })
export class Verification {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    example: VerificationType,
    description: '타입',
  })
  @Column({
    type: 'enum',
    enum: VerificationType,
    // default: VerificationType.SMS,
  })
  type: VerificationType;

  @ApiProperty({
    example: '',
    description: '수신 전화번호',
  })
  @IsString()
  @Column()
  to: string;

  //   @ApiProperty({
  //     example: '',
  //     description: '인증 토큰',
  //   })
  //   @IsString()
  //   @Column()
  //   token: string;

  @ApiProperty({
    example: '',
    description: '인증 키',
  })
  @IsString()
  @Column()
  key: string;
}
