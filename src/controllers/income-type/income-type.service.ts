import { Injectable } from '@nestjs/common';
import { User } from '../user/user.typings';
import { IncomeTypeApiService } from 'src/services/database/income-type-api.service';
import { IncomeType, IncomeTypeSearchParams } from './income-type.typings';

@Injectable()
export class IncomeTypeService {
  constructor(private incomeTypeApiService: IncomeTypeApiService) {}

  public async getIncomeType(
    userId: User['id'],
    id: IncomeType['id'],
  ): Promise<IncomeType> {
    return this.incomeTypeApiService.getIncomeType(userId, id);
  }

  public async getIncomeTypes(
    userId: User['id'],
    searchParams: IncomeTypeSearchParams,
  ): Promise<IncomeType[]> {
    return this.incomeTypeApiService.getIncomeTypes(userId, searchParams);
  }

  public async createIncomeType(
    userId: User['id'],
    incomeType: IncomeType,
  ): Promise<IncomeType> {
    return this.incomeTypeApiService.createIncomeType(userId, incomeType);
  }

  public async removeIncomeType(
    userId: User['id'],
    id: IncomeType['id'],
  ): Promise<IncomeType> {
    return this.incomeTypeApiService.removeIncomeType(userId, id);
  }

  public async editIncomeType(
    userId: User['id'],
    id: IncomeType['id'],
    editParams: Partial<IncomeType>,
  ): Promise<IncomeType> {
    return this.incomeTypeApiService.editIncomeType(userId, id, editParams);
  }
}
