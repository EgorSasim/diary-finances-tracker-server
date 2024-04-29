import { Module } from '@nestjs/common';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';
import { ServiceSharedModule } from 'src/services-shared.module';

@Module({
  controllers: [ExpenseController],
  providers: [ExpenseService],
  imports: [ServiceSharedModule],
})
export class ExpenseModule {}
