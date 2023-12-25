import { Injectable, Logger } from '@nestjs/common';
import { VersionedAggregateRoot } from '../../../domain/aggregate-root';
import { SerializableEvent } from '../../../domain/interfaces/serializable-event';

@Injectable()
export class EventSerializer {
  private readonly logger = new Logger(EventSerializer.name);

  serialize<T>(
    event: T,
    dispatcher: VersionedAggregateRoot,
  ): SerializableEvent<T> {
    this.logger.debug(`${EventSerializer.name} - serialize`);

    const eventType = event.constructor?.name;
    if (!eventType) {
      throw new Error('Incompatible event type');
    }

    const aggregateId = dispatcher.id;

    return {
      streamId: aggregateId,
      position: dispatcher.version.value + 1,
      type: eventType,
      data: this.toJSON(event),
    };
  }

  private toJSON<T>(data: T) {
    this.logger.debug(`${EventSerializer.name} - toJSON`);

    if (typeof data !== 'object' || data === null) {
      return data;
    }

    if ('toJSON' in data && typeof data.toJSON === 'function') {
      return data.toJSON();
    }

    if (Array.isArray(data)) {
      return data.map((item) => this.toJSON(item));
    }

    return Object.entries(data).reduce((acc, [key, value]) => {
      acc[key] = this.toJSON(value);
      return acc;
    }, {});
  }
}
