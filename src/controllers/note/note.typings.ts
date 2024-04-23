import { User } from '../user/user.typings';

export interface Note {
  id: number;
  title: string;
  description: string;
  creationDate: Date;
  user: User;
}

export interface NoteSearchParams {
  title: string;
  creationDate: Date;
}
