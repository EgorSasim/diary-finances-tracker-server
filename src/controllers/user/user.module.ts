import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ServiceSharedModule } from 'src/services-shared.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [ServiceSharedModule],
})
export class UserModule {}
