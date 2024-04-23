import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NoteSearchParams } from 'src/controllers/note/note.typings';
import { NoteEntity } from 'src/model/note.entity';
import { UserEntity } from 'src/model/user.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class NoteApiService {
  constructor(
    @InjectRepository(NoteEntity)
    private noteRepository: Repository<NoteEntity>,
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
    });
  }

  public async createNote(note: NoteEntity): Promise<NoteEntity> {
    return this.noteRepository.save(note);
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
    updateParams: Partial<NoteEntity>,
  ): Promise<NoteEntity> {
    await this.noteRepository.update(
      { user: { id: userId }, id: noteId },
      updateParams,
    );
    return this.noteRepository.findOne({
      where: { user: { id: userId }, id: noteId },
    });
  }
}
