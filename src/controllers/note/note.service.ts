import { Injectable } from '@nestjs/common';
import { NoteApiService } from 'src/services/database/note-api.service';
import { User } from '../user/user.typings';
import { Note } from './note.typings';
import { NoteEntity } from 'src/model/note.entity';
import { UserEntity } from 'src/model/user.entity';

@Injectable()
export class NoteService {
  constructor(private noteApiService: NoteApiService) {}

  public async getNoteById(
    userId: User['id'],
    noteId: Note['id'],
  ): Promise<Note> {
    return this.noteApiService.getNoteById(userId, noteId);
  }

  public async getNotes(userId: User['id']): Promise<Note[]> {
    return this.noteApiService.getNotes(userId);
  }

  public async createNote(note: Note): Promise<Note> {
    return this.noteApiService.createNote(note as NoteEntity);
  }

  public async removeNote(
    userId: User['id'],
    noteId: Note['id'],
  ): Promise<Note> {
    return this.noteApiService.removeNote(userId, noteId);
  }

  public async editNote(
    userId: User['id'],
    noteId: Note['id'],
    updateParams: Partial<Note>,
  ): Promise<Note> {
    return this.noteApiService.editNote(
      userId,
      noteId,
      updateParams as UserEntity,
    );
  }
}
