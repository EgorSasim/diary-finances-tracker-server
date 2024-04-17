import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskSearchParams } from 'src/controllers/task/task.typings';
import { User } from 'src/controllers/user/user.typings';
import { TaskEntity } from 'src/model/task.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class TaskApiService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  public async getTaskById(
    userId: User['id'],
    taskId: TaskEntity['id'],
  ): Promise<TaskEntity> {
    return await this.taskRepository.findOne({
      where: { user: { id: userId }, id: taskId },
    });
  }

  public async getTasks(
    userId: User['id'],
    searchParams: TaskSearchParams,
  ): Promise<TaskEntity[]> {
    return this.taskRepository.find({
      where: {
        user: {
          id: userId,
        },
        ...searchParams,
        title: searchParams.title ? Like(`%${searchParams.title}%`) : null,
      },
    });
  }

  public async createTask(task: TaskEntity): Promise<TaskEntity> {
    return this.taskRepository.save(task);
  }

  public async removeTask(
    userId: User['id'],
    taskId: TaskEntity['id'],
  ): Promise<TaskEntity> {
    const taskToDelete = await this.taskRepository.findOne({
      where: { user: { id: userId }, id: taskId },
    });

    return this.taskRepository.remove(taskToDelete);
  }

  public async editTask(
    userId: User['id'],
    taskId: TaskEntity['id'],
    updateParams: Partial<TaskEntity>,
  ): Promise<TaskEntity> {
    await this.taskRepository.update(
      { user: { id: userId }, id: taskId },
      updateParams,
    );
    return this.taskRepository.findOne({
      where: { user: { id: userId }, id: taskId },
    });
  }
}
