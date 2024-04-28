import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user.entity';

@Entity('income')
export class IncomeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 10 })
  amount: number;

  @Column()
  type: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'text' })
  comment: string;

  @ManyToOne(() => UserEntity, (user) => user.incomes)
  user: UserEntity;
}
