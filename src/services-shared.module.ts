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
import { IncomeApiService } from './services/database/income-api.service';
import { IncomeEntity } from './model/income/income.entity';

@Module({
  providers: [
    NoteApiService,
    TaskApiService,
    UserApiService,
    SpaceApiService,
    PasswordService,
    IncomeApiService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      NoteEntity,
      TaskEntity,
      UserEntity,
      SpaceEntity,
      IncomeEntity,
    ]),
  ],
  exports: [
    NoteApiService,
    TaskApiService,
    UserApiService,
    SpaceApiService,
    PasswordService,
    IncomeApiService,
  ],
})
export class ServiceSharedModule {}
