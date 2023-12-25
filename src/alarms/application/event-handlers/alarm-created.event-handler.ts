import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AlarmCreatedEvent } from '../../domain/events/alarm-created.event';
import { sleep } from 'src/helpers/time';
import { UpsertMaterializedAlarmRepository } from 'src/alarms/application/ports/upsert-materialized-alarm.repository';
import { SerializedEventPayload } from 'src/shared/domain/interfaces/serializable-event';

@EventsHandler(AlarmCreatedEvent)
export class AlarmCreatedEventHandler
  implements IEventHandler<SerializedEventPayload<AlarmCreatedEvent>>
{
  private readonly logger = new Logger(AlarmCreatedEventHandler.name);

  constructor(
    private readonly upsertMaterializedAlarmRepository: UpsertMaterializedAlarmRepository,
  ) {}

  async handle(event: SerializedEventPayload<AlarmCreatedEvent>) {
    this.logger.log(`Alarm created event: ${JSON.stringify(event)}`);

    this.logger.log(`Sleep start`);
    await sleep(1000);
    this.logger.log(`Done sleeping`);

    this.logger.log(`Starting upsert`);
    await this.upsertMaterializedAlarmRepository.upsert({
      id: event.alarm.id,
      name: event.alarm.name,
      severity: event.alarm.severity.value,
      triggeredAt: new Date(event.alarm.triggeredAt),
      isAcknowledged: event.alarm.isAcknowledged,
      items: event.alarm.items,
    });
    this.logger.log(`Done upserting`);
  }
}
