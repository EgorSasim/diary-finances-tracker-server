import { Module } from '@nestjs/common';
import { ServiceSharedModule } from 'src/services-shared.module';
import { ExpenseTypeController } from './expense-type.controller';
import { ExpenseTypeService } from './expense-type.service';

@Module({
  controllers: [ExpenseTypeController],
  providers: [ExpenseTypeService],
  imports: [ServiceSharedModule],
})
export class ExpenseTypeModule {}
