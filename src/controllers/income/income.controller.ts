import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { IncomeService } from './income.service';
import { Income, IncomeSearchParams } from './income.typings';
import { User } from '../user/user.typings';
import { getTruthyTypes } from 'src/helpers/helpers';
import { getIncomeSearchParamsTruthyTypes } from './income.helpers';

@Controller('income')
export class IncomeController {
  constructor(private incomeService: IncomeService) {}

  @Get(':id')
  public getIncome(
    @Req() req: Request,
    @Param('id') id: number,
  ): Promise<Income> {
    const userId: User['id'] = req['user']['id'];
    return this.incomeService.getIncome(userId, id);
  }

  @Get()
  public getIncomes(
    @Req() req: Request,
    @Query() incomeSearchParams: IncomeSearchParams,
  ): Promise<Income[]> {
    const userId: User['id'] = req['user']['id'];
    return this.incomeService.getIncomes(
      userId,
      getIncomeSearchParamsTruthyTypes(
        getTruthyTypes<IncomeSearchParams>(incomeSearchParams),
      ),
    );
  }

  @Post()
  public async createIncome(
    @Req() req: Request,
    @Body() income: Income,
  ): Promise<Income> {
    const userId: User['id'] = req['user']['id'];
    return this.incomeService.createIncome(
      userId,
      getTruthyTypes<Income>(income),
    );
  }

  @Patch(':id')
  public async editIncome(
    @Req() req: Request,
    @Param('id') id: number,
    @Body() income: Partial<Income>,
  ): Promise<Income> {
    const userId: User['id'] = req['user']['id'];
    return this.incomeService.editIncome(
      userId,
      id,
      getTruthyTypes<Income>(income as Income),
    );
  }

  @Delete(':id')
  public async removeNote(
    @Req() req: Request,
    @Param('id') id: number,
  ): Promise<Income> {
    const userId = +req['user']['id'];
    return this.incomeService.removeIncome(userId, id);
  }
}
