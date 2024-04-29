import { Injectable } from '@nestjs/common';
import { User } from '../user/user.typings';
import { Expense, ExpenseSearchParams } from './expense.typings';
import { ExpenseApiService } from 'src/services/database/expense-api.service';

@Injectable()
export class ExpenseService {
  constructor(private expenseApiService: ExpenseApiService) {}

  public async getExpense(
    userId: User['id'],
    id: Expense['id'],
  ): Promise<Expense> {
    return this.expenseApiService.getExpense(userId, id);
  }

  public async getExpenses(
    userId: User['id'],
    searchParams: ExpenseSearchParams,
  ): Promise<Expense[]> {
    return this.expenseApiService.getExpenses(userId, searchParams);
  }

  public async createExpense(
    userId: User['id'],
    expense: Expense,
  ): Promise<Expense> {
    return this.expenseApiService.createExpense(userId, expense);
  }

  public async removeExpense(
    userId: User['id'],
    id: Expense['id'],
  ): Promise<Expense> {
    return this.expenseApiService.removeExpense(userId, id);
  }

  public async editExpense(
    userId: User['id'],
    id: Expense['id'],
    editParams: Partial<Expense>,
  ): Promise<Expense> {
    return this.expenseApiService.editExpense(userId, id, editParams);
  }
}
