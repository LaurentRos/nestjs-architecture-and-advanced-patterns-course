import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EVENT_STORE_CONNECTION } from '../../core/core.constants';
import { MongoEventStore } from './event-store/mongo-event-store';
import { EventStorePublisher } from './event-store/publishers/event-store.publisher';
import { Event, EventSchema } from './event-store/schemas/event.schema';
import { EventSerializer } from './event-store/serializers/event.serializer';
import { EventsBridge } from 'src/shared/infrastructure/event-store/events-bridge';
import { EventDeserializer } from 'src/shared/infrastructure/event-store/deserializers/event.deserializer';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Event.name, schema: EventSchema }],
      EVENT_STORE_CONNECTION,
    ),
  ],
  providers: [
    EventSerializer,
    EventStorePublisher,
    MongoEventStore,
    EventsBridge,
    EventDeserializer,
  ],
})
export class SharedInfrastructureModule {}
