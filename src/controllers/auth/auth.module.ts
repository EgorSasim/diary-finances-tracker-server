import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PasswordService } from 'src/services/password.service';
import { UserService } from 'src/services/database/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/model/user.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PasswordService, UserService],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class AuthModule {}
