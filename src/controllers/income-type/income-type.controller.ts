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
import { User } from '../user/user.typings';
import { getTruthyTypes } from 'src/helpers/helpers';
import { IncomeType, IncomeTypeSearchParams } from './income-type.typings';
import { IncomeTypeService } from './income-type.service';

@Controller('incomeType')
export class IncomeTypeController {
  constructor(private incomeTypeService: IncomeTypeService) {}

  @Get(':id')
  public getIncomeType(
    @Req() req: Request,
    @Param('id') id: number,
  ): Promise<IncomeType> {
    const userId: User['id'] = req['user']['id'];
    return this.incomeTypeService.getIncomeType(userId, id);
  }

  @Get()
  public getIncomeTypes(
    @Req() req: Request,
    @Query() incomeTypeSearchParams: IncomeTypeSearchParams,
  ): Promise<IncomeType[]> {
    const userId: User['id'] = req['user']['id'];
    return this.incomeTypeService.getIncomeTypes(
      userId,
      getTruthyTypes<IncomeTypeSearchParams>(incomeTypeSearchParams),
    );
  }

  @Post()
  public async createIncomeType(
    @Req() req: Request,
    @Body() incomeType: IncomeType,
  ): Promise<IncomeType> {
    const userId: User['id'] = req['user']['id'];
    return this.incomeTypeService.createIncomeType(
      userId,
      getTruthyTypes<IncomeType>(incomeType),
    );
  }

  @Patch(':id')
  public async editIncomeType(
    @Req() req: Request,
    @Param('id') id: number,
    @Body() incomeType: Partial<IncomeType>,
  ): Promise<IncomeType> {
    const userId: User['id'] = req['user']['id'];
    return this.incomeTypeService.editIncomeType(
      userId,
      id,
      getTruthyTypes<Partial<IncomeType>>(incomeType),
    );
  }

  @Delete(':id')
  public async removeIncomeType(
    @Req() req: Request,
    @Param('id') id: number,
  ): Promise<IncomeType> {
    const userId: User['id'] = req['user']['id'];
    return this.incomeTypeService.removeIncomeType(userId, id);
  }
}
