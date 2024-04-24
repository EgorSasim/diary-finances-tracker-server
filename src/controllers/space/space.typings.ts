import { NoteEntity } from 'src/model/note.entity';
import { Note } from '../note/note.typings';
import { Task } from '../task/task.typings';
import { TaskEntity } from 'src/model/task.entity';

export interface Space {
  id: number;
  name: string;
  noteIds: Note['id'][];
  taskIds: Task['id'][];
}

export interface SpaceSearchParams {
  name?: string;
  noteIds?: number[];
  taskIds?: number[];
}

export interface SpaceDtoSearchParams {
  name: string;
  notes: NoteEntity[];
  tasks: TaskEntity[];
}

export interface SpaceCreateParams {
  noteIds: Note['id'][];
  taskIds: Task['id'][];
  name: Space['name'];
}
