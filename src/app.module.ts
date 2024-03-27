import { Module } from '@nestjs/common';
import { AuthModule } from './controllers/auth/auth.module';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './controllers/auth/auth.constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },

    Reflector,
  ],
  imports: [
    AuthModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
  ],
})
export class AppModule {}
