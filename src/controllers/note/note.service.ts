import { Injectable } from '@nestjs/common';
import { NoteApiService } from 'src/services/database/note-api.service';
import { User } from '../user/user.typings';
import {
  Note,
  NoteSearchParams,
  NoteWithSpaceIds,
  NoteWithSpaces,
} from './note.typings';

@Injectable()
export class NoteService {
  constructor(private noteApiService: NoteApiService) {}

  public async getNoteById(
    userId: User['id'],
    noteId: Note['id'],
  ): Promise<Note> {
    return this.noteApiService.getNoteById(userId, noteId);
  }

  public async getNotes(
    userId: User['id'],
    searchParams: NoteSearchParams,
  ): Promise<NoteWithSpaces[]> {
    return this.noteApiService.getNotes(userId, searchParams);
  }

  public async createNote(
    userId: number,
    note: NoteWithSpaceIds,
  ): Promise<NoteWithSpaces> {
    return this.noteApiService.createNote(userId, note);
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
    updateParams: Partial<NoteWithSpaceIds>,
  ): Promise<NoteWithSpaces> {
    return this.noteApiService.editNote(userId, noteId, updateParams);
  }
}
