import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/controllers/task/task.typings';
import { User } from 'src/controllers/user/user.typings';
import { TaskEntity } from 'src/model/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskApiService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  public async getTaskById(
    userId: User['id'],
    taskId: Task['id'],
  ): Promise<TaskEntity> {
    return (
      await this.taskRepository.find({ where: { userId, id: taskId } })
    )[0];
  }

  public async getAllTasks(userId: User['id']): Promise<TaskEntity[]> {
    return this.taskRepository.find({ where: { userId } });
  }

  public async createTask(task: Task): Promise<TaskEntity> {
    return this.taskRepository.save(task);
  }

  public async removeTask(
    userId: User['id'],
    taskId: Task['id'],
  ): Promise<TaskEntity> {
    const taskToDelete = await this.taskRepository.findOne({
      where: { userId, id: taskId },
    });

    return this.taskRepository.remove(taskToDelete);
  }

  public async editTask(userId: User['id'], task: Task): Promise<TaskEntity> {
    await this.taskRepository.update({ userId, id: task.id }, task);
    return this.taskRepository.findOne({ where: { userId, id: task.id } });
  }
}