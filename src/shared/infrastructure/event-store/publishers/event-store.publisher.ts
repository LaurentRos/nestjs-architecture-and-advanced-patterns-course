import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { EventBus, IEvent, IEventPublisher } from '@nestjs/cqrs';
import { VersionedAggregateRoot } from '../../../domain/aggregate-root';
import { MongoEventStore } from '../mongo-event-store';
import { EventSerializer } from '../serializers/event.serializer';

@Injectable()
export class EventStorePublisher
  implements OnApplicationBootstrap, IEventPublisher
{
  private readonly logger = new Logger(EventStorePublisher.name);

  constructor(
    private readonly eventStore: MongoEventStore,
    private readonly eventBus: EventBus,
    private readonly eventSerializer: EventSerializer,
  ) {}

  onApplicationBootstrap() {
    this.logger.debug(`${EventStorePublisher.name} - onApplicationBootstrap`);

    this.eventBus.publisher = this;
  }

  // async publish<T extends IEvent = IEvent>(
  publish<T extends IEvent = IEvent>(
    event: T,
    dispatcher: VersionedAggregateRoot,
  ) {
    this.logger.debug(`${EventStorePublisher.name} - publish`);

    // this.logger.debug(`Sleep start`);
    // await sleep(1000);
    // this.logger.debug(`Done sleeping`);

    // this.logger.debug(`Continue publishing`);

    this.logger.debug(`Start serializing`);
    const serializableEvent = this.eventSerializer.serialize(event, dispatcher);
    this.logger.debug(`Done serializing`);

    this.logger.debug(`Start persisting`);
    const persistedEvent = this.eventStore.persist(serializableEvent);
    this.logger.debug(`Done persisting`);

    return persistedEvent;
  }

  // async publishAll<T extends IEvent = IEvent>(
  publishAll<T extends IEvent = IEvent>(
    events: T[],
    dispatcher: VersionedAggregateRoot,
  ) {
    this.logger.debug(`${EventStorePublisher.name} - publishAll`);

    // this.logger.debug(`Sleep start`);
    // await sleep(1000);
    // this.logger.debug(`Done sleeping`);

    // this.logger.debug(`Continue publishing`);

    this.logger.debug(`Start serializing`);
    const serializableEvents = events
      .map((event) => this.eventSerializer.serialize(event, dispatcher))
      .map((serializableEvent, index) => ({
        ...serializableEvent,
        position: dispatcher.version.value + index + 1,
      }));
    this.logger.debug(`Done serializing`);

    this.logger.debug(`Start persisting`);
    const persistedEvents = this.eventStore.persist(serializableEvents);
    this.logger.debug(`Done persisting`);

    return persistedEvents;
  }
}
