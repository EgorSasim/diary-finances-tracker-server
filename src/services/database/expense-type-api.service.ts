import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'src/controllers/user/user.typings';
import { Repository } from 'typeorm';
import { UserApiService } from './user-api.service';
import { ExpenseTypeEntity } from 'src/model/expense/expense-type.entity';
import {
  ExpenseType,
  ExpenseTypeSearchParams,
} from 'src/controllers/expense-type/expense-type.typings';

@Injectable()
export class ExpenseTypeApiService {
  constructor(
    @InjectRepository(ExpenseTypeEntity)
    private expenseTypeRepository: Repository<ExpenseTypeEntity>,
    @Inject(forwardRef(() => UserApiService))
    private userApiService: UserApiService,
  ) {}

  public async getExpenseType(
    userId: User['id'],
    id: ExpenseType['id'],
  ): Promise<ExpenseTypeEntity> {
    return await this.expenseTypeRepository.findOne({
      where: { user: { id: userId }, id },
    });
  }

  public async getExpenseTypes(
    userId: User['id'],
    searchParams: ExpenseTypeSearchParams,
  ): Promise<ExpenseTypeEntity[]> {
    return await this.expenseTypeRepository.find({
      where: { user: { id: userId }, ...searchParams },
    });
  }

  public async createExpenseType(
    userId: User['id'],
    expenseType: ExpenseType,
  ): Promise<ExpenseTypeEntity> {
    const user = await this.userApiService.getUserById(userId);
    const expenseEntity: ExpenseTypeEntity = {
      ...expenseType,
      user,
    };
    return this.expenseTypeRepository.save(expenseEntity);
  }

  public async removeExpenseType(
    userId: User['id'],
    id: ExpenseType['id'],
  ): Promise<ExpenseTypeEntity> {
    const expenseToRemove = await this.expenseTypeRepository.findOne({
      where: { user: { id: userId }, id },
    });
    return this.expenseTypeRepository.remove(expenseToRemove);
  }

  public async editExpenseType(
    userId: User['id'],
    id: ExpenseType['id'],
    updateParams: Partial<ExpenseType>,
  ): Promise<ExpenseTypeEntity> {
    const expenseType = await this.getExpenseType(userId, id);
    await this.expenseTypeRepository.save({ ...expenseType, ...updateParams });
    return this.expenseTypeRepository.findOne({
      where: { user: { id: userId }, id },
    });
  }
}
