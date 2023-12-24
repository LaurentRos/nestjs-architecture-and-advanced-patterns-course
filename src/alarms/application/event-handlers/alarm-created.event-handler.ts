import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AlarmCreatedEvent } from '../../domain/events/alarm-created.event';
import { sleep } from 'src/helpers/time';

@EventsHandler(AlarmCreatedEvent)
export class AlarmCreatedEventHandler
  implements IEventHandler<AlarmCreatedEvent>
{
  private readonly logger = new Logger(AlarmCreatedEventHandler.name);

  async handle(event: AlarmCreatedEvent) {
    this.logger.log(`Alarm created event: ${JSON.stringify(event)}`);
    this.logger.log(`Sleep start`);
    await sleep(1000);
    this.logger.log(`Done sleeping`);
  }
}
