import { DynamicModule, Module, Type } from '@nestjs/common';
import { AlarmFactory } from './domain/factories/alarm.factory';
import { AlarmsController } from './presenters/http/alarms.controller';
import { AlarmsFacade } from './alarms.service';
import { CreateAlarmCommandHandler } from 'src/alarms/application/commands/create-alarm.command-handler';
import { GetAlarmsQueryHandler } from 'src/alarms/application/queries/get-alarms.query-handler';
import { AlarmCreatedEventHandler } from 'src/alarms/application/event-handlers/alarm-created.event-handler';
import { AcknowledgeAlarmCommandHandler } from 'src/alarms/application/commands/acknowledge-alarm.command-handler';
import { AlarmAcknowledgedEventHandler } from 'src/alarms/application/event-handlers/alarm-acknowledged.event-handler';

@Module({
  controllers: [AlarmsController],
  providers: [
    AlarmsFacade,
    AlarmFactory,
    CreateAlarmCommandHandler,
    GetAlarmsQueryHandler,
    AlarmCreatedEventHandler,
    AcknowledgeAlarmCommandHandler,
    AlarmAcknowledgedEventHandler,
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
