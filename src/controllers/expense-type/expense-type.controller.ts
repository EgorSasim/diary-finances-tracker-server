import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { User } from '../user/user.typings';
import { getTruthyTypes } from 'src/helpers/helpers';
import { ExpenseType, ExpenseTypeSearchParams } from './expense-type.typings';
import { ExpenseTypeService } from './expense-type.service';

@Controller('expenseType')
export class ExpenseTypeController {
  constructor(private expenseTypeService: ExpenseTypeService) {}

  @Get(':id')
  public getExpenseType(
    @Req() req: Request,
    @Param('id') id: number,
  ): Promise<ExpenseType> {
    const userId: User['id'] = req['user']['id'];
    return this.expenseTypeService.getExpenseType(userId, id);
  }

  @Get()
  public getExpenseTypes(
    @Req() req: Request,
    @Query() expenseTypeSearchParams: ExpenseTypeSearchParams,
  ): Promise<ExpenseType[]> {
    const userId: User['id'] = req['user']['id'];
    return this.expenseTypeService.getExpenseTypes(
      userId,
      getTruthyTypes<ExpenseTypeSearchParams>(expenseTypeSearchParams),
    );
  }

  @Post()
  public async createExpenseType(
    @Req() req: Request,
    @Body() expenseType: ExpenseType,
  ): Promise<ExpenseType> {
    const userId: User['id'] = req['user']['id'];
    return this.expenseTypeService.createExpenseType(
      userId,
      getTruthyTypes<ExpenseType>(expenseType),
    );
  }

  @Patch(':id')
  public async editExpenseType(
    @Req() req: Request,
    @Param('id') id: number,
    @Body() expenseType: Partial<ExpenseType>,
  ): Promise<ExpenseType> {
    const userId: User['id'] = req['user']['id'];
    return this.expenseTypeService.editExpenseType(
      userId,
      id,
      getTruthyTypes<Partial<ExpenseType>>(expenseType),
    );
  }
}
