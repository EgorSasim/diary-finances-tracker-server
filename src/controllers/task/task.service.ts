import { Injectable } from '@nestjs/common';
import { TaskApiService } from 'src/services/database/task-api.service';
import {
  Task,
  TaskSearchParams,
  TaskWithSpaceIds,
  TaskWithSpaces,
} from './task.typings';
import { User } from '../user/user.typings';

@Injectable()
export class TaskService {
  constructor(private taskApiSerivce: TaskApiService) {}

  public async getTaskById(
    userId: User['id'],
    taskId: Task['id'],
  ): Promise<TaskWithSpaces> {
    return this.taskApiSerivce.getTaskById(userId, taskId);
  }

  public async getTasks(
    userId: User['id'],
    searchParams: TaskSearchParams,
  ): Promise<TaskWithSpaces[]> {
    return this.taskApiSerivce.getTasks(userId, searchParams);
  }

  public async createTask(
    userId: User['id'],
    task: TaskWithSpaceIds,
  ): Promise<Task> {
    return this.taskApiSerivce.createTask(userId, task);
  }

  public async removeTask(userId: number, taskId: Task['id']): Promise<Task> {
    return this.taskApiSerivce.removeTask(userId, taskId);
  }

  public async editTask(
    userId: number,
    taskId: Task['id'],
    updateParams: Partial<TaskWithSpaceIds>,
  ): Promise<Task> {
    return this.taskApiSerivce.editTask(userId, taskId, updateParams);
  }
}
