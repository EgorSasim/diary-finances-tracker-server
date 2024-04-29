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
import { ExpenseService } from './expense.service';
import { Expense, ExpenseSearchParams } from './expense.typings';
import { User } from '../user/user.typings';
import { getTruthyTypes } from 'src/helpers/helpers';
import { getExpenseSearchParamsTruthyTypes } from './expense.helpers';

@Controller('expense')
export class ExpenseController {
  constructor(private expenseService: ExpenseService) {}

  @Get(':id')
  public getExpense(
    @Req() req: Request,
    @Param('id') id: number,
  ): Promise<Expense> {
    const userId: User['id'] = req['user']['id'];
    return this.expenseService.getExpense(userId, id);
  }

  @Get()
  public getExpenses(
    @Req() req: Request,
    @Query() expenseSearchParams: ExpenseSearchParams,
  ): Promise<Expense[]> {
    const userId: User['id'] = req['user']['id'];
    return this.expenseService.getExpenses(
      userId,
      getExpenseSearchParamsTruthyTypes(
        getTruthyTypes<ExpenseSearchParams>(expenseSearchParams),
      ),
    );
  }

  @Post()
  public async createExpense(
    @Req() req: Request,
    @Body() expense: Expense,
  ): Promise<Expense> {
    const userId: User['id'] = req['user']['id'];
    return this.expenseService.createExpense(
      userId,
      getTruthyTypes<Expense>(expense),
    );
  }

  @Patch(':id')
  public async editExpense(
    @Req() req: Request,
    @Param('id') id: number,
    @Body() expense: Partial<Expense>,
  ): Promise<Expense> {
    const userId: User['id'] = req['user']['id'];
    return this.expenseService.editExpense(
      userId,
      id,
      getTruthyTypes<Expense>(expense as Expense),
    );
  }

  @Delete(':id')
  public async removeNote(
    @Req() req: Request,
    @Param('id') id: number,
  ): Promise<Expense> {
    const userId = +req['user']['id'];
    return this.expenseService.removeExpense(userId, id);
  }
}
