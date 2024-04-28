import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TaskEntity } from './task.entity';
import { NoteEntity } from './note.entity';
import { SpaceEntity } from './space.entity';
import { IncomeEntity } from './income/income.entity';
import { IncomeTypeEntity } from './income/income-type.entity';

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

  @OneToMany(() => IncomeEntity, (income) => income.user)
  incomes: IncomeEntity[];

  @OneToMany(() => IncomeTypeEntity, (income_type) => income_type.user)
  income_types: IncomeTypeEntity[];
}
