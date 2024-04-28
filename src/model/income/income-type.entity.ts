import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user.entity';

@Entity('income_type')
export class IncomeTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @ManyToOne(() => UserEntity, (user) => user.income_types)
  user: UserEntity;
}
