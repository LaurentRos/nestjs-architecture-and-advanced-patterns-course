import { AlarmItemEntity } from './alarm-item.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('alarms')
export class AlarmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  severity: string;

  @Column()
  triggeredAt: Date;

  @Column()
  isAcknowledged: boolean;

  @OneToMany(() => AlarmItemEntity, (item) => item.alarm, { cascade: true })
  items: AlarmItemEntity[];
}
