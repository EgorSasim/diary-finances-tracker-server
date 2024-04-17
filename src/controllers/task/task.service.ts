import { Injectable } from '@nestjs/common';
import { TaskApiService } from 'src/services/database/task-api.service';
import { Task, TaskSearchParams } from './task.typings';
import { User } from '../user/user.typings';
import { mapTaskToTaskEntity } from './mappers';

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
    const params: TaskSearchParams = {};
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && value !== 'null') {
        console.log('value: ', value);
        params[key] = value;
      }
    });
    console.log('search params:  ', searchParams);
    console.log('params: ', params);
    return this.taskApiSerivce.getTasks(userId, params);
  }

  public async createTask(task: Task): Promise<Task> {
    return this.taskApiSerivce.createTask(mapTaskToTaskEntity(task));
  }

  public async removeTask(userId: number, taskId: Task['id']): Promise<Task> {
    return this.taskApiSerivce.removeTask(userId, taskId);
  }

  public async editTask(
    userId: number,
    taskId: Task['id'],
    updateParams: Partial<Task>,
  ): Promise<Task> {
    return this.taskApiSerivce.editTask(
      userId,
      taskId,
      mapTaskToTaskEntity(updateParams as Task),
    );
  }
}
