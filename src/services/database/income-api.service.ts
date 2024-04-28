import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Income,
  IncomeSearchParams,
} from 'src/controllers/income/income.typings';
import { User } from 'src/controllers/user/user.typings';
import { IncomeEntity } from 'src/model/income/income.entity';
import { Repository } from 'typeorm';
import { UserApiService } from './user-api.service';

@Injectable()
export class IncomeApiService {
  constructor(
    @InjectRepository(IncomeEntity)
    private incomeRepository: Repository<IncomeEntity>,
    private userApiService: UserApiService,
  ) {}

  public async getIncome(
    userId: User['id'],
    id: Income['id'],
  ): Promise<IncomeEntity> {
    return await this.incomeRepository.findOne({
      where: { user: { id: userId }, id },
    });
  }

  public async getIncomes(
    userId: User['id'],
    searchParams: IncomeSearchParams,
  ): Promise<IncomeEntity[]> {
    return await this.incomeRepository.find({
      where: { user: { id: userId }, ...searchParams },
    });
  }

  public async createIncome(
    userId: User['id'],
    income: Income,
  ): Promise<IncomeEntity> {
    const user = await this.userApiService.getUserById(userId);
    const incomeEntity: IncomeEntity = {
      ...income,
      user,
    };
    return this.incomeRepository.save(incomeEntity);
  }

  public async removeIncome(
    userId: User['id'],
    id: Income['id'],
  ): Promise<IncomeEntity> {
    const incomeToRemove = await this.incomeRepository.findOne({
      where: { user: { id: userId }, id },
    });
    return this.incomeRepository.remove(incomeToRemove);
  }

  public async editIncome(
    userId: User['id'],
    id: Income['id'],
    updateParams: Partial<Income>,
  ): Promise<IncomeEntity> {
    const income = await this.getIncome(userId, id);
    await this.incomeRepository.save({ ...income, ...updateParams });
    return this.incomeRepository.findOne({
      where: { user: { id: userId }, id },
    });
  }
}
