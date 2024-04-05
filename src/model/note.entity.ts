import {
  Column,
  Entity,
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

  @Column()
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.notes)
  user: UserEntity;

  @ManyToMany(() => SpaceEntity, (space) => space.notes)
  spaces: SpaceEntity[];
}
