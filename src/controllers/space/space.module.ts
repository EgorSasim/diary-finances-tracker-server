import { Module } from '@nestjs/common';
import { ServiceSharedModule } from 'src/services-shared.module';
import { SpaceController } from './space.controller';
import { SpaceService } from './space.service';

@Module({
  controllers: [SpaceController],
  imports: [ServiceSharedModule],
  providers: [SpaceService],
})
export class SpaceModule {}
