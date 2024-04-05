import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { NoteEntity } from './note.entity';
import { TaskEntity } from './task.entity';

@Entity('space')
export class SpaceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => UserEntity, (user) => user.spaces)
  user: UserEntity;

  @ManyToMany(() => NoteEntity, (note) => note.spaces)
  notes: NoteEntity[];

  @ManyToMany(() => TaskEntity, (task) => task.spaces)
  tasks: TaskEntity[];
}
