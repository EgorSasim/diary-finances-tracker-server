import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { TaskPriority, TaskStatus } from 'src/controllers/task/task.typings';
import { SpaceEntity } from './space.entity';
import { TaskReccuranceEntity } from './task-reccurance.entity';

@Entity('task')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'date' })
  creationDate: Date;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  priority?: TaskPriority;

  @Column({ nullable: true, type: 'date' })
  startDate?: Date;

  @Column({ nullable: true, type: 'date' })
  endDate?: Date;

  @Column({ nullable: true, type: 'date' })
  reminder?: Date;

  @Column({ nullable: true })
  status: TaskStatus;

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  user: UserEntity;

  @OneToOne(() => TaskReccuranceEntity, (reccurance) => reccurance.task)
  reccurance: TaskReccuranceEntity;

  @ManyToMany(() => SpaceEntity, (space) => space.tasks)
  @JoinTable({ name: 'tasks_spaces' })
  spaces: SpaceEntity[];
}
