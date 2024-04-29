import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/controllers/user/user.typings';
import { Repository } from 'typeorm';
import { UserApiService } from './user-api.service';
import { ExpenseEntity } from 'src/model/expense/expense.entity';
import {
  Expense,
  ExpenseSearchParams,
} from 'src/controllers/expense/expense.typings';

@Injectable()
export class ExpenseApiService {
  constructor(
    @InjectRepository(ExpenseEntity)
    private expenseRepository: Repository<ExpenseEntity>,
    private userApiService: UserApiService,
  ) {}

  public async getExpense(
    userId: User['id'],
    id: Expense['id'],
  ): Promise<ExpenseEntity> {
    return await this.expenseRepository.findOne({
      where: { user: { id: userId }, id },
    });
  }

  public async getExpenses(
    userId: User['id'],
    searchParams: ExpenseSearchParams,
  ): Promise<ExpenseEntity[]> {
    return await this.expenseRepository.find({
      where: { user: { id: userId }, ...searchParams },
    });
  }

  public async createExpense(
    userId: User['id'],
    expense: Expense,
  ): Promise<ExpenseEntity> {
    const user = await this.userApiService.getUserById(userId);
    const expenseEntity: ExpenseEntity = {
      ...expense,
      user,
    };
    return this.expenseRepository.save(expenseEntity);
  }

  public async removeExpense(
    userId: User['id'],
    id: Expense['id'],
  ): Promise<ExpenseEntity> {
    const expenseToRemove = await this.expenseRepository.findOne({
      where: { user: { id: userId }, id },
    });
    return this.expenseRepository.remove(expenseToRemove);
  }

  public async editExpense(
    userId: User['id'],
    id: Expense['id'],
    updateParams: Partial<Expense>,
  ): Promise<ExpenseEntity> {
    const expense = await this.getExpense(userId, id);
    await this.expenseRepository.save({ ...expense, ...updateParams });
    return this.expenseRepository.findOne({
      where: { user: { id: userId }, id },
    });
  }
}
