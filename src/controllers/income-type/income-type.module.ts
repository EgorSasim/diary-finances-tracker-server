import { Module } from '@nestjs/common';
import { ServiceSharedModule } from 'src/services-shared.module';
import { IncomeTypeController } from './income-type.controller';
import { IncomeTypeService } from './income-type.service';

@Module({
  controllers: [IncomeTypeController],
  providers: [IncomeTypeService],
  imports: [ServiceSharedModule],
})
export class IncomeTypeModule {}
