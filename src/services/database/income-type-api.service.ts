import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'src/controllers/user/user.typings';
import { Repository } from 'typeorm';
import { UserApiService } from './user-api.service';
import { IncomeTypeEntity } from 'src/model/income/income-type.entity';
import {
  IncomeType,
  IncomeTypeSearchParams,
} from 'src/controllers/income-type/income-type.typings';

@Injectable()
export class IncomeTypeApiService {
  constructor(
    @InjectRepository(IncomeTypeEntity)
    private incomeTypeRepository: Repository<IncomeTypeEntity>,
    @Inject(forwardRef(() => UserApiService))
    private userApiService: UserApiService,
  ) {}

  public async getIncomeType(
    userId: User['id'],
    id: IncomeType['id'],
  ): Promise<IncomeTypeEntity> {
    return await this.incomeTypeRepository.findOne({
      where: { user: { id: userId }, id },
    });
  }

  public async getIncomeTypes(
    userId: User['id'],
    searchParams: IncomeTypeSearchParams,
  ): Promise<IncomeTypeEntity[]> {
    return await this.incomeTypeRepository.find({
      where: { user: { id: userId }, ...searchParams },
    });
  }

  public async createIncomeType(
    userId: User['id'],
    incomeType: IncomeType,
  ): Promise<IncomeTypeEntity> {
    const user = await this.userApiService.getUserById(userId);
    const incomeEntity: IncomeTypeEntity = {
      ...incomeType,
      user,
    };
    return this.incomeTypeRepository.save(incomeEntity);
  }

  public async removeIncomeType(
    userId: User['id'],
    id: IncomeType['id'],
  ): Promise<IncomeTypeEntity> {
    const incomeToRemove = await this.incomeTypeRepository.findOne({
      where: { user: { id: userId }, id },
    });
    return this.incomeTypeRepository.remove(incomeToRemove);
  }

  public async editIncomeType(
    userId: User['id'],
    id: IncomeType['id'],
    updateParams: Partial<IncomeType>,
  ): Promise<IncomeTypeEntity> {
    const incomeType = await this.getIncomeType(userId, id);
    await this.incomeTypeRepository.save({ ...incomeType, ...updateParams });
    return this.incomeTypeRepository.findOne({
      where: { user: { id: userId }, id },
    });
  }
}
