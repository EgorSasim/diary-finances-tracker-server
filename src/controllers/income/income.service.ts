import { Injectable } from '@nestjs/common';
import { User } from '../user/user.typings';
import { Income, IncomeSearchParams } from './income.typings';
import { IncomeApiService } from 'src/services/database/income-api.service';

@Injectable()
export class IncomeService {
  constructor(private incomeApiService: IncomeApiService) {}

  public async getIncome(
    userId: User['id'],
    id: Income['id'],
  ): Promise<Income> {
    return this.incomeApiService.getIncome(userId, id);
  }

  public async getIncomes(
    userId: User['id'],
    searchParams: IncomeSearchParams,
  ): Promise<Income[]> {
    return this.incomeApiService.getIncomes(userId, searchParams);
  }

  public async createIncome(
    userId: User['id'],
    income: Income,
  ): Promise<Income> {
    return this.incomeApiService.createIncome(userId, income);
  }

  public async removeIncome(
    userId: User['id'],
    id: Income['id'],
  ): Promise<Income> {
    return this.incomeApiService.removeIncome(userId, id);
  }

  public async editIncome(
    userId: User['id'],
    id: Income['id'],
    editParams: Partial<Income>,
  ): Promise<Income> {
    return this.incomeApiService.editIncome(userId, id, editParams);
  }
}
