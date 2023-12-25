import { Module } from '@nestjs/common';
import { AggregateRehydrator } from 'src/shared/application/aggregate-rehydrator';
import { SharedInfrastructureModule } from 'src/shared/infrastructure/shared-infrastructure.module';

@Module({
  imports: [SharedInfrastructureModule],
  providers: [AggregateRehydrator],
  exports: [SharedInfrastructureModule, AggregateRehydrator],
})
export class SharedModule {}
