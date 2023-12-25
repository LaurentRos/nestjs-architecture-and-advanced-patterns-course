import { AlarmItem } from 'src/alarms/domain/alarm-item';
import { AlarmSeverity } from 'src/alarms/domain/value-objects/alarm-severity';
import { VersionedAggregateRoot } from 'src/shared/domain/aggregate-root';

export class Alarm extends VersionedAggregateRoot {
  public name: string;
  public severity: AlarmSeverity;
  public triggeredAt: Date;
  public isAcknowledged = false;
  public items = new Array<AlarmItem>();

  constructor(public id: string) {
    super();
  }

  acknowledge() {
    this.isAcknowledged = true;
  }

  addAlarmItem(item: AlarmItem) {
    this.items.push(item);
  }
}
