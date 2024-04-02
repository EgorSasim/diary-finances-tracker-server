import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity, TaskReccuranceEntity } from 'src/model/task.entity';
import { TaskController } from './task.controller';
import { TaskApiService } from 'src/services/database/task-api.service';
import { TaskService } from './task.service';

@Module({
  controllers: [TaskController],
  imports: [TypeOrmModule.forFeature([TaskEntity, TaskReccuranceEntity])],
  providers: [TaskService, TaskApiService],
})
export class TaskModule {}
