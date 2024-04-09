import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { ServiceSharedModule } from 'src/services-shared.module';

@Module({
  controllers: [NoteController],
  imports: [ServiceSharedModule],
  providers: [NoteService],
})
export class NoteModule {}
