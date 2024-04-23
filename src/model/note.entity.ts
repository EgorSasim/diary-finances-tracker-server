import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { SpaceEntity } from './space.entity';

@Entity('note')
export class NoteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false })
  creationDate: Date;

  @ManyToOne(() => UserEntity, (user) => user.notes)
  user: UserEntity;

  @ManyToMany(() => SpaceEntity, (space) => space.notes)
  @JoinTable({ name: 'notes_spaces' })
  spaces: SpaceEntity[];
}
