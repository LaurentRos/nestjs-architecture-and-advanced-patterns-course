import { DynamicModule, Module, Type } from '@nestjs/common';
import { AlarmFactory } from './domain/factories/alarm.factory';
import { AlarmsController } from './presenters/http/alarms.controller';
import { AlarmsFacade } from './alarms.service';
import { CreateAlarmCommandHandler } from 'src/alarms/application/commands/create-alarm.command-handler';
import { GetAlarmsQueryHandler } from 'src/alarms/application/queries/get-alarms.query-handler';
import { AlarmCreatedEventHandler } from 'src/alarms/application/event-handlers/alarm-created.event-handler';
import { AcknowledgeAlarmCommandHandler } from 'src/alarms/application/commands/acknowledge-alarm.command-handler';
import { AlarmAcknowledgedEventHandler } from 'src/alarms/application/event-handlers/alarm-acknowledged.event-handler';
import { CascadingAlarmsSaga } from 'src/alarms/application/sagas/cascading-alarms.saga';
import { NotifyFacilitySupervisorCommandHandler } from 'src/alarms/application/commands/notify-facility-supervisor.command-handler';
import { UnacknowledgedAlarmsSaga } from 'src/alarms/application/sagas/unacknowledged-alarms.saga';

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
    CascadingAlarmsSaga,
    NotifyFacilitySupervisorCommandHandler,
    UnacknowledgedAlarmsSaga,
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
