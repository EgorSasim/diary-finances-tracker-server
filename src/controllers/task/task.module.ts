import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { ServiceSharedModule } from 'src/services-shared.module';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [ServiceSharedModule],
})
export class TaskModule {}
