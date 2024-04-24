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
import {
  Note,
  NoteSearchParams,
  NoteWithSpaceIds,
  NoteWithSpaces,
} from './note.typings';
import { getNoteSearchParamsTruthyTypes } from './note.helpers';

@Controller('note')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Get()
  public async getNotes(
    @Query() noteSearchParams: NoteSearchParams,
    @Req() req: Request,
  ): Promise<NoteWithSpaces[]> {
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
  public async createNote(
    @Req() req: Request,
    @Body() noteWithSpaceIds: NoteWithSpaceIds,
  ): Promise<Note> {
    const userId = +req['user']['id'];
    return this.noteService.createNote(userId, noteWithSpaceIds);
  }

  @Patch(':id')
  public async updateNote(
    @Req() req: Request,
    @Body() body: Partial<NoteWithSpaceIds>,
    @Param('id') id: number,
  ): Promise<NoteWithSpaces> {
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
