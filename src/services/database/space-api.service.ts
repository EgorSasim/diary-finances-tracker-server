import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Space,
  SpaceDtoSearchParams,
  SpaceSearchParams,
} from 'src/controllers/space/space.typings';
import { SpaceEntity } from 'src/model/space.entity';
import { UserEntity } from 'src/model/user.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { UserApiService } from './user-api.service';
import { TaskApiService } from './task-api.service';
import { NoteApiService } from './note-api.service';
import { TaskEntity } from 'src/model/task.entity';
import { NoteEntity } from 'src/model/note.entity';

@Injectable()
export class SpaceApiService {
  constructor(
    @InjectRepository(SpaceEntity)
    private spaceRepository: Repository<SpaceEntity>,
    private userApiService: UserApiService,
    private taskApiService: TaskApiService,
    private noteApiService: NoteApiService,
  ) {}

  public async getSpace(
    searchParams: FindOptionsWhere<SpaceEntity>,
  ): Promise<SpaceEntity> {
    const obj = await this.spaceRepository.findOne({
      where: searchParams,
      relations: ['tasks', 'notes'],
      select: { notes: { id: true }, tasks: { id: true } },
    });
    return obj;
  }

  public async getSpaces(
    userId: number,
    searchParams: SpaceSearchParams,
  ): Promise<SpaceEntity[]> {
    const params: SpaceDtoSearchParams = {
      name: searchParams.name,
    } as SpaceDtoSearchParams;

    return this.spaceRepository.find({
      where: {
        user: { id: userId },
        ...params,
        name: params.name ? Like(`%${params.name}%`) : null,
      },
      relations: ['tasks', 'notes'],
    });
  }

  public async createSpace(
    space: Space,
    userId: UserEntity['id'],
    taskIds?: number[],
    noteIds?: number[],
  ): Promise<SpaceEntity> {
    const user = await this.userApiService.getUserById(userId);
    let tasks: TaskEntity[];
    let notes: NoteEntity[];
    if (taskIds) {
      tasks = await Promise.all(
        taskIds.map((taskId) =>
          this.taskApiService.getTaskById(userId, taskId),
        ),
      );
    }
    if (noteIds) {
      notes = await Promise.all(
        noteIds.map((noteId) =>
          this.noteApiService.getNoteById(userId, noteId),
        ),
      );
    }
    const spaceEntity: SpaceEntity = {
      ...space,
      notes,
      tasks,
      user,
    };

    return this.spaceRepository.save(spaceEntity);
  }

  public async removeSpace(
    userId: UserEntity['id'],
    spaceId: SpaceEntity['id'],
  ): Promise<SpaceEntity> {
    const spaceToRemove = await this.spaceRepository.findOne({
      where: { user: { id: userId }, id: spaceId },
    });

    return this.spaceRepository.remove(spaceToRemove);
  }

  public async editSpace(
    userId: UserEntity['id'],
    spaceId: SpaceEntity['id'],
    updateParams: Partial<SpaceEntity>,
  ): Promise<SpaceEntity> {
    const user = await this.userApiService.getUserById(updateParams.user.id);
    let tasks = null;
    let notes = null;
    if (updateParams.tasks) {
      tasks = await Promise.all(
        updateParams.tasks.map((task) =>
          this.taskApiService.getTaskById(user.id, task.id),
        ),
      );
    }

    if (updateParams.notes) {
      notes = await Promise.all(
        updateParams.notes.map((note) =>
          this.noteApiService.getNoteById(user.id, note.id),
        ),
      );
    }

    const entity: SpaceEntity = {
      id: +spaceId,
      name: updateParams.name,
      notes,
      user,
      tasks,
    };
    await this.spaceRepository.save(entity);
    return this.spaceRepository.findOne({
      where: { user: { id: userId }, id: spaceId },
    });
  }
}
