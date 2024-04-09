import { TaskReccuranceType } from 'src/controllers/task/task.typings';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskEntity } from './task.entity';

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

  @OneToOne(() => TaskEntity, (task) => task)
  task: TaskEntity;
}
