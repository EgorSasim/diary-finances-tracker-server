import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PasswordService } from 'src/services/password.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/model/user.entity';
import { UserApiService } from 'src/services/database/user-api.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PasswordService, UserApiService],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class AuthModule {}
