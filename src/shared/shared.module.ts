import { Module } from '@nestjs/common';
import { SharedInfrastructureModule } from 'src/shared/infrastructure/shared-infrastructure.module';

@Module({
  imports: [SharedInfrastructureModule],
  exports: [SharedInfrastructureModule],
})
export class SharedModule {}
