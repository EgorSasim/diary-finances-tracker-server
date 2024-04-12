import { Injectable } from '@nestjs/common';
import { User } from '../user/user.typings';
import { UserEntity } from 'src/model/user.entity';
import { Space } from './space.typings';
import { SpaceApiService } from 'src/services/database/space-api.service';
import { SpaceEntity } from 'src/model/space.entity';
import { FindOptionsWhere } from 'typeorm';
import { NoteEntity } from 'src/model/note.entity';
import { TaskEntity } from 'src/model/task.entity';

@Injectable()
export class SpaceService {
  constructor(private spaceApiService: SpaceApiService) {}

  public async getSpace(
    searchParams: FindOptionsWhere<SpaceEntity>,
  ): Promise<SpaceEntity> {
    return this.spaceApiService.getSpace(searchParams);
  }

  public async getSpaces(
    searchParams: FindOptionsWhere<SpaceEntity>,
  ): Promise<SpaceEntity[]> {
    return this.spaceApiService.getSpaces(searchParams);
  }

  public async createSpace(
    space: Space,
    userId: User['id'],
    taskIds?: number[],
    noteIds?: number[],
  ): Promise<SpaceEntity> {
    return this.spaceApiService.createSpace(space, userId, taskIds, noteIds);
  }

  public async removeSpace(
    userId: UserEntity['id'],
    spaceId: SpaceEntity['id'],
  ): Promise<SpaceEntity> {
    return this.spaceApiService.removeSpace(userId, spaceId);
  }

  public async editSpace(
    userId: UserEntity['id'],
    spaceId: SpaceEntity['id'],
    updateParams: Partial<Space>,
  ): Promise<SpaceEntity> {
    const notes = updateParams.noteIds.map((id) => ({
      id,
    })) as NoteEntity[];
    const tasks = updateParams.taskIds.map((id) => ({
      id,
    })) as TaskEntity[];
    const params: Partial<SpaceEntity> = {
      notes: notes,
      tasks: tasks,
      id: updateParams.id,
      name: updateParams.name,
      user: {
        id: userId,
      } as UserEntity,
    };
    return this.spaceApiService.editSpace(userId, spaceId, params);
  }
}
