import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Space } from 'src/controllers/space/space.typings';
import { SpaceEntity } from 'src/model/space.entity';
import { UserEntity } from 'src/model/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
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
    return this.spaceRepository.findOne({ where: searchParams });
  }

  public async getSpaces(
    searchParams: FindOptionsWhere<SpaceEntity>,
  ): Promise<SpaceEntity[]> {
    return this.spaceRepository.find({
      where: searchParams,
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
    const spaceEntit: SpaceEntity = {
      ...space,
      notes,
      tasks,
      user,
    };

    return this.spaceRepository.save(spaceEntit);
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
    await this.spaceRepository.update(
      { user: { id: userId }, id: spaceId },
      updateParams,
    );

    return this.spaceRepository.findOne({
      where: { user: { id: userId }, id: spaceId },
    });
  }
}
