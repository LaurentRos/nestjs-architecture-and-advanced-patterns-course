import { DynamicModule, Module, Type } from '@nestjs/common';
import { AlarmFactory } from './domain/factories/alarm.factory';
import { AlarmsController } from './presenters/http/alarms.controller';
import { AlarmsFacade } from './alarms.service';
import { CreateAlarmCommandHandler } from 'src/alarms/application/commands/create-alarm.command-handler';
import { GetAlarmsQueryHandler } from 'src/alarms/application/queries/get-alarms.query-handler';

@Module({
  controllers: [AlarmsController],
  providers: [
    AlarmsFacade,
    AlarmFactory,
    CreateAlarmCommandHandler,
    GetAlarmsQueryHandler,
  ],
})
export class AlarmsModule {
  static withInfrastructure(infrastructureModule: Type | DynamicModule) {
    // 👈 new static method
    return {
      module: AlarmsModule,
      imports: [infrastructureModule],
    };
  }
}
