import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import {
  TaskPriority,
  TaskReccurance,
  TaskReccuranceType,
} from 'src/controllers/task/task.typings';

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

  @Column({ default: false, type: 'boolean' })
  completed: boolean;

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  user: UserEntity;

  @OneToOne(
    () => TaskReccuranceEntity,
    (taskReccurance) => taskReccurance.taskId,
  )
  taskReccurance: TaskReccurance;
}

@Entity('task_reccurance')
export class TaskReccuranceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  interval: number;

  @Column()
  type: TaskReccuranceType;

  @Column({ nullable: true, type: 'simple-array' })
  daysOfWeek?: string[];

  @Column({ nullable: true, type: 'simple-array' })
  daysOfMonth?: number[];

  @OneToOne(() => TaskEntity, (task) => task.id)
  taskId: number;
}
