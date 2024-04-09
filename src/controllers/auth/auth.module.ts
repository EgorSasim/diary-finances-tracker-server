import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PasswordService } from 'src/services/password.service';
import { ServiceSharedModule } from 'src/services-shared.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PasswordService],
  imports: [ServiceSharedModule],
})
export class AuthModule {}
