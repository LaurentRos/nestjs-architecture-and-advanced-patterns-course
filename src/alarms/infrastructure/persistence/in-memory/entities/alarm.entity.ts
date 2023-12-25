import { AlarmItemEntity } from 'src/alarms/infrastructure/persistence/in-memory/entities/alarm-item.entity';

export class AlarmEntity {
  id: string;
  name: string;
  severity: string;
  triggeredAt: Date;
  isAcknowledged: boolean;
  items: Array<AlarmItemEntity>;
}
