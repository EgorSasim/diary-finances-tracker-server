import { Injectable } from '@nestjs/common';
import { TaskApiService } from 'src/services/database/task-api.service';
import { Task, TaskSearchParams } from './task.typings';
import { User } from '../user/user.typings';
import { TaskEntity } from 'src/model/task.entity';

@Injectable()
export class TaskService {
  constructor(private taskApiSerivce: TaskApiService) {}

  public async getTaskById(
    userId: User['id'],
    taskId: Task['id'],
  ): Promise<Task> {
    return this.taskApiSerivce.getTaskById(userId, taskId);
  }

  public async getTasks(
    userId: User['id'],
    searchParams: TaskSearchParams,
  ): Promise<Task[]> {
    // console.log('search params: ', searchParams);
    return this.taskApiSerivce.getTasks(userId, searchParams);
  }

  public async createTask(task: Task): Promise<Task> {
    console.log('task: ', task);
    return this.taskApiSerivce.createTask(task as TaskEntity);
  }

  public async removeTask(userId: number, taskId: Task['id']): Promise<Task> {
    return this.taskApiSerivce.removeTask(userId, taskId);
  }

  public async editTask(
    userId: number,
    taskId: Task['id'],
    updateParams: Partial<Task>,
  ): Promise<Task> {
    console.log('update params: ', updateParams);
    return this.taskApiSerivce.editTask(
      userId,
      taskId,
      updateParams as TaskEntity,
    );
  }
}
