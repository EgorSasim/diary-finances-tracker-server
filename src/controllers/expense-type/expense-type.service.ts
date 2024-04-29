import { Injectable } from '@nestjs/common';
import { User } from '../user/user.typings';
import { ExpenseTypeApiService } from 'src/services/database/expense-type-api.service';
import { ExpenseType, ExpenseTypeSearchParams } from './expense-type.typings';

@Injectable()
export class ExpenseTypeService {
  constructor(private expenseTypeApiService: ExpenseTypeApiService) {}

  public async getExpenseType(
    userId: User['id'],
    id: ExpenseType['id'],
  ): Promise<ExpenseType> {
    return this.expenseTypeApiService.getExpenseType(userId, id);
  }

  public async getExpenseTypes(
    userId: User['id'],
    searchParams: ExpenseTypeSearchParams,
  ): Promise<ExpenseType[]> {
    return this.expenseTypeApiService.getExpenseTypes(userId, searchParams);
  }

  public async createExpenseType(
    userId: User['id'],
    expenseType: ExpenseType,
  ): Promise<ExpenseType> {
    return this.expenseTypeApiService.createExpenseType(userId, expenseType);
  }

  public async removeExpenseType(
    userId: User['id'],
    id: ExpenseType['id'],
  ): Promise<ExpenseType> {
    return this.expenseTypeApiService.removeExpenseType(userId, id);
  }

  public async editExpenseType(
    userId: User['id'],
    id: ExpenseType['id'],
    editParams: Partial<ExpenseType>,
  ): Promise<ExpenseType> {
    return this.expenseTypeApiService.editExpenseType(userId, id, editParams);
  }
}
