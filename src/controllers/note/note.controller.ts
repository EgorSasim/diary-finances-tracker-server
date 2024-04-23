import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { Note, NoteSearchParams } from './note.typings';
import { User } from '../user/user.typings';
import { getNoteSearchParamsTruthyTypes } from './note.helpers';

@Controller('note')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Get()
  public async getNotes(
    @Query() noteSearchParams: NoteSearchParams,
    @Req() req: Request,
  ): Promise<Note[]> {
    const userId = +req['user']['id'];
    return this.noteService.getNotes(
      userId,
      getNoteSearchParamsTruthyTypes(noteSearchParams),
    );
  }

  @Get(':id')
  public async getNoteById(
    @Req() req: Request,
    @Param('id') id: number,
  ): Promise<Note> {
    const userId = +req['user']['id'];
    return this.noteService.getNoteById(userId, +id);
  }

  @Post()
  public async createNote(@Req() req: Request, @Body() body): Promise<Note> {
    const userId = +req['user']['id'];
    const note: Note = body;
    note.user = { id: userId } as User;
    return this.noteService.createNote(note);
  }

  @Patch(':id')
  public async updateNote(
    @Req() req: Request,
    @Body() body: Partial<Note>,
    @Param('id') id: number,
  ): Promise<Note> {
    const userId = +req['user']['id'];
    return this.noteService.editNote(userId, id, body);
  }

  @Delete(':id')
  public async removeNote(
    @Req() req: Request,
    @Param('id') id: number,
  ): Promise<Note> {
    const userId = +req['user']['id'];
    return this.noteService.removeNote(userId, id);
  }
}
