import { Module } from '@nestjs/common';
import { NoteApiService } from './services/database/note-api.service';
import { TaskApiService } from './services/database/task-api.service';
import { UserApiService } from './services/database/user-api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteEntity } from './model/note.entity';
import { TaskEntity } from './model/task.entity';
import { UserEntity } from './model/user.entity';
import { SpaceApiService } from './services/database/space-api.service';
import { SpaceEntity } from './model/space.entity';
import { PasswordService } from './services/password.service';

@Module({
  providers: [
    NoteApiService,
    TaskApiService,
    UserApiService,
    SpaceApiService,
    PasswordService,
  ],
  imports: [
    TypeOrmModule.forFeature([NoteEntity, TaskEntity, UserEntity, SpaceEntity]),
  ],
  exports: [
    NoteApiService,
    TaskApiService,
    UserApiService,
    SpaceApiService,
    PasswordService,
  ],
})
export class ServiceSharedModule {}
