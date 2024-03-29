import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserApiService } from 'src/services/database/user-api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/model/user.entity';

@Module({
  controllers: [UserController],
  providers: [UserService, UserApiService],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class UserModule {}
