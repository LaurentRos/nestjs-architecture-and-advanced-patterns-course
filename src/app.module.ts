import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlarmsModule } from './alarms/alarms.module';
import { CoreModule } from './core/core.module';
import { AlarmsInfrastructureModule } from 'src/alarms/infrastructure/alarms-infrastructure.module';
import { ApplicationBootstrapOptions } from 'src/common/interfaces/application-bootstrap-options.interface';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CoreModule, CqrsModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static register(options: ApplicationBootstrapOptions) {
    // 👈 new method
    return {
      module: AppModule,
      imports: [
        CoreModule.forRoot(options),
        AlarmsModule.withInfrastructure(
          AlarmsInfrastructureModule.use(options.driver),
        ),
      ],
    };
  }
}
