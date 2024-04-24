import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateTask,
  EditTask,
  TaskSearchParams,
} from 'src/controllers/task/task.typings';
import { User } from 'src/controllers/user/user.typings';
import { SpaceEntity } from 'src/model/space.entity';
import { TaskEntity } from 'src/model/task.entity';
import { LessThanOrEqual, Like, MoreThanOrEqual, Repository } from 'typeorm';
import { SpaceApiService } from './space-api.service';
import { UserApiService } from './user-api.service';

@Injectable()
export class TaskApiService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
    @Inject(forwardRef(() => SpaceApiService))
    private spaceApiService: SpaceApiService,
    private userApiservice: UserApiService,
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
    task: CreateTask,
  ): Promise<TaskEntity> {
    let spaces = null as SpaceEntity[];
    if (task.spaces) {
      spaces = await Promise.all(
        task.spaces.map((spaceId) =>
          this.spaceApiService.getSpace({ id: spaceId, user: { id: userId } }),
        ),
      );
    }
    const taskEntity = {
      ...task,
      spaces,
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
    updateParams: Partial<EditTask>,
  ): Promise<TaskEntity> {
    let task = await this.getTaskById(userId, taskId);
    task = { ...task, ...updateParams } as TaskEntity;
    let spaces = [] as SpaceEntity[];
    console.log('update params: ', updateParams);
    if (updateParams.spaces) {
      spaces = await Promise.all(
        updateParams.spaces.map((spaceId) =>
          this.spaceApiService.getSpace({ id: spaceId, user: { id: userId } }),
        ),
      );
    }
    task.spaces = spaces;
    await this.taskRepository.save(task);
    return this.taskRepository.findOne({
      where: { user: { id: userId }, id: taskId },
    });
  }
}

// delete updateParams.spaceIds;

// const taskEntity = {
//   ...updateParams,
//   spaces,
// } as Partial<TaskEntity>;
