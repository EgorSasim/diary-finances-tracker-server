import { Injectable } from '@nestjs/common';
import { TaskApiService } from 'src/services/database/task-api.service';
import { Task } from './task.typings';
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

  public async getAllTasks(userId: User['id']): Promise<Task[]> {
    return this.taskApiSerivce.getAllTasks(userId);
  }

  public async createTask(task: Task): Promise<Task> {
    return this.taskApiSerivce.createTask(task);
  }

  public async removeTask(userId: number, taskId: Task['id']): Promise<Task> {
    return this.taskApiSerivce.removeTask(userId, taskId);
  }

  public async editTask(
    userId: number,
    taskId: Task['id'],
    updateParams: Partial<Task>,
  ): Promise<Task> {
    return this.taskApiSerivce.editTask(userId, taskId, updateParams);
  }
}
