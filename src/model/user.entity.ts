import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TaskEntity } from './task.entity';
import { NoteEntity } from './note.entity';
import { SpaceEntity } from './space.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks: TaskEntity[];

  @OneToMany(() => NoteEntity, (note) => note.user)
  notes: NoteEntity[];

  @OneToMany(() => SpaceEntity, (space) => space.user)
  spaces: SpaceEntity[];
}
