import { Module } from '@nestjs/common';
import { AuthModule } from './controllers/auth/auth.module';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './controllers/auth/auth.constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { UserModule } from './controllers/user/user.module';
import { TaskModule } from './controllers/task/task.module';
import { NoteModule } from './controllers/note/note.module';
import { SpaceModule } from './controllers/space/space.module';
import { TestModule } from './test/test.module';

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
    UserModule,
    TaskModule,
    NoteModule,
    SpaceModule,
    TestModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30m' },
    }),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
  ],
})
export class AppModule {}
