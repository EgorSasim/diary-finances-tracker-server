import { Module } from '@nestjs/common';
import { IncomeController } from './income.controller';
import { IncomeService } from './income.service';
import { ServiceSharedModule } from 'src/services-shared.module';

@Module({
  controllers: [IncomeController],
  providers: [IncomeService],
  imports: [ServiceSharedModule],
})
export class IncomeModule {}
