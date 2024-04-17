import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { ServiceSharedModule } from 'src/services-shared.module';

@Module({
  providers: [TestService],
  imports: [ServiceSharedModule],
  exports: [TestService],
})
export class TestModule {}
