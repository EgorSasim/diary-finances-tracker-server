import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteEntity } from 'src/model/note.entity';
import { NoteService } from './note.service';
import { NoteApiService } from 'src/services/database/note-api.service';

@Module({
  controllers: [NoteController],
  imports: [TypeOrmModule.forFeature([NoteEntity])],
  providers: [NoteService, NoteApiService],
})
export class NoteModule {}
