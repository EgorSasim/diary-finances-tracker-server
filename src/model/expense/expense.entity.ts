import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user.entity';

@Entity('expense')
export class ExpenseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', nullable: false })
  amount: number;

  @Column({ nullable: true })
  type: string;

  @Column({ type: 'date', nullable: false })
  date: Date;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @ManyToOne(() => UserEntity, (user) => user.expenses)
  user: UserEntity;
}
