import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { TaskEntity } from './task.entity';
import { NoteEntity } from './note.entity';

@Entity('space')
export class SpaceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => UserEntity, (user) => user.spaces)
  user: UserEntity;

  @ManyToMany(() => TaskEntity, (task) => task.spaces)
  tasks: TaskEntity[];

  @ManyToMany(() => NoteEntity, (note) => note.spaces)
  notes: NoteEntity[];
}
