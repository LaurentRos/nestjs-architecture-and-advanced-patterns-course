import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Alarm } from '../../domain/alarm';
import { GetAlarmsQuery } from './get-alarms.query';
import { AlarmRepository } from '../ports/alarm.repository';
import { Logger } from '@nestjs/common';

@QueryHandler(GetAlarmsQuery)
export class GetAlarmsQueryHandler
  implements IQueryHandler<GetAlarmsQuery, Alarm[]>
{
  private readonly logger = new Logger(GetAlarmsQueryHandler.name);

  constructor(private readonly alarmRepository: AlarmRepository) {}

  async execute(): Promise<Alarm[]> {
    this.logger.debug(`Processing "GetAlarmsQuery"`);
    return this.alarmRepository.findAll();
  }
}
