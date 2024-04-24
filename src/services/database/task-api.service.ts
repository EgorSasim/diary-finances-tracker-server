import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  TaskSearchParams,
  TaskWithSpaceIds,
} from 'src/controllers/task/task.typings';
import { User } from 'src/controllers/user/user.typings';
import { SpaceEntity } from 'src/model/space.entity';
import { TaskEntity } from 'src/model/task.entity';
import { LessThanOrEqual, Like, MoreThanOrEqual, Repository } from 'typeorm';
import { SpaceApiService } from './space-api.service';
import { Space } from 'src/controllers/space/space.typings';
import { UserApiService } from './user-api.service';

@Injectable()
export class TaskApiService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
    @Inject(forwardRef(() => SpaceApiService))
    private spaceApiService: SpaceApiService,
    private userApiService: UserApiService,
  ) {}

  public async getTaskById(
    userId: User['id'],
    taskId: TaskEntity['id'],
  ): Promise<TaskEntity> {
    return await this.taskRepository.findOne({
      where: { user: { id: userId }, id: taskId },
      relations: ['spaces'],
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
        startDate: searchParams.startDate
          ? MoreThanOrEqual(searchParams.startDate)
          : null,
        endDate: searchParams.endDate
          ? LessThanOrEqual(searchParams.endDate)
          : null,
      },
    });
  }

  public async createTask(
    userId: User['id'],
    task: TaskWithSpaceIds,
  ): Promise<TaskEntity> {
    const spaces = await this.getTaskSpaces(userId, task.spaceIds);
    const user = await this.userApiService.getUserById(userId);
    const taskEntity = {
      ...task,
      spaces: spaces,
      user,
    };

    return this.taskRepository.save(taskEntity);
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
    updateParams: Partial<TaskWithSpaceIds>,
  ): Promise<TaskEntity> {
    let task = await this.getTaskById(userId, taskId);
    task = { ...task, ...updateParams } as TaskEntity;
    const spaces = await this.getTaskSpaces(userId, updateParams.spaceIds);
    const taskEntity: TaskEntity = { ...task, spaces };
    await this.taskRepository.save(taskEntity);
    return this.taskRepository.findOne({
      where: { user: { id: userId }, id: taskId },
    });
  }

  private async getTaskSpaces(
    userId: User['id'],
    spaceIds: Space['id'][],
  ): Promise<SpaceEntity[] | null> {
    if (!spaceIds?.length) {
      return null;
    }
    return await Promise.all(
      spaceIds.map((spaceId) =>
        this.spaceApiService.getSpace({ id: spaceId, user: { id: userId } }),
      ),
    );
  }
}
