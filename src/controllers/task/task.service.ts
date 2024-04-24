import { Injectable } from '@nestjs/common';
import { TaskApiService } from 'src/services/database/task-api.service';
import { EditTask, Task, TaskSearchParams } from './task.typings';
import { User } from '../user/user.typings';

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
    return this.taskApiSerivce.getTasks(userId, searchParams);
  }

  public async createTask(userId: User['id'], task: Task): Promise<Task> {
    return this.taskApiSerivce.createTask(userId, task);
  }

  public async removeTask(userId: number, taskId: Task['id']): Promise<Task> {
    return this.taskApiSerivce.removeTask(userId, taskId);
  }

  public async editTask(
    userId: number,
    taskId: Task['id'],
    updateParams: Partial<EditTask>,
  ): Promise<Task> {
    return this.taskApiSerivce.editTask(userId, taskId, updateParams);
  }
}
