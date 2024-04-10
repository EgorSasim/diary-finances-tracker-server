import { Note } from '../note/note.typings';
import { Task } from '../task/task.typings';

export interface Space {
  id: number;
  name: string;
}

export interface SpaceCreateParams {
  noteIds: Note['id'][];
  taskIds: Task['id'][];
  name: Space['name'];
}
