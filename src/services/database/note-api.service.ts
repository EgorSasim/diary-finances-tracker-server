import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  NoteSearchParams,
  NoteWithSpaceIds,
} from 'src/controllers/note/note.typings';
import { NoteEntity } from 'src/model/note.entity';
import { UserEntity } from 'src/model/user.entity';
import { Like, Repository } from 'typeorm';
import { UserApiService } from './user-api.service';
import { SpaceEntity } from 'src/model/space.entity';
import { User } from 'src/controllers/user/user.typings';
import { Space } from 'src/controllers/space/space.typings';
import { SpaceApiService } from './space-api.service';

@Injectable()
export class NoteApiService {
  constructor(
    @InjectRepository(NoteEntity)
    private noteRepository: Repository<NoteEntity>,
    private userApiService: UserApiService,
    @Inject(forwardRef(() => SpaceApiService))
    private spaceApiService: SpaceApiService,
  ) {}

  public async getNoteById(
    userId: UserEntity['id'],
    noteId: NoteEntity['id'],
  ): Promise<NoteEntity> {
    return this.noteRepository.findOne({
      where: {
        user: { id: userId },
        id: noteId,
      },
      relations: ['spaces'],
    });
  }

  public async getNotes(
    userId: UserEntity['id'],
    searchParams: NoteSearchParams,
  ): Promise<NoteEntity[]> {
    return this.noteRepository.find({
      where: {
        user: { id: userId },
        ...searchParams,
        title: searchParams.title ? Like(`%${searchParams.title}%`) : null,
      },
      relations: ['spaces'],
    });
  }

  public async createNote(
    userId: number,
    note: NoteWithSpaceIds,
  ): Promise<NoteEntity> {
    const user = await this.userApiService.getUserById(userId);
    const spaces = await this.getRelatedSpaces(userId, note.spaceIds);
    const noteEntity: NoteEntity = {
      ...note,
      user,
      spaces,
    };
    return this.noteRepository.save(noteEntity);
  }

  public async removeNote(
    userId: UserEntity['id'],
    noteId: NoteEntity['id'],
  ): Promise<NoteEntity> {
    const noteToDelete = await this.noteRepository.findOne({
      where: { user: { id: userId }, id: noteId },
    });
    return this.noteRepository.remove(noteToDelete);
  }

  public async editNote(
    userId: UserEntity['id'],
    noteId: NoteEntity['id'],
    updateParams: Partial<NoteWithSpaceIds>,
  ): Promise<NoteEntity> {
    let note = await this.getNoteById(userId, noteId);
    note = { ...note, ...updateParams };
    const spaces = await this.getRelatedSpaces(userId, updateParams.spaceIds);
    const noteEntity = { ...note, spaces };
    await this.noteRepository.save(noteEntity);
    return this.noteRepository.findOne({
      where: { user: { id: userId }, id: noteId },
    });
  }

  private async getRelatedSpaces(
    userId: User['id'],
    spaceIds: Space['id'][],
  ): Promise<SpaceEntity[]> {
    if (!spaceIds?.length) {
      return null;
    }
    return Promise.all(
      spaceIds.map((id) =>
        this.spaceApiService.getSpace({ id, user: { id: userId } }),
      ),
    );
  }
}
