import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './model/user.entity';
import { AuthModule } from '@auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), AuthModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
