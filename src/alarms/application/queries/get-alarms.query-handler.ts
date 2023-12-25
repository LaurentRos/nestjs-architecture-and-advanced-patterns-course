import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAlarmsRepository } from 'src/alarms/application/ports/find-alarms.repository';
import { AlarmReadModel } from 'src/alarms/domain/read-models/alarm.read-model';
import { GetAlarmsQuery } from './get-alarms.query';

@QueryHandler(GetAlarmsQuery)
export class GetAlarmsQueryHandler
  implements IQueryHandler<GetAlarmsQuery, AlarmReadModel[]>
{
  private readonly logger = new Logger(GetAlarmsQueryHandler.name);

  constructor(private readonly alarmRepository: FindAlarmsRepository) {}

  async execute(): Promise<AlarmReadModel[]> {
    this.logger.debug(`Processing "GetAlarmsQuery"`);
    return this.alarmRepository.findAll();
  }
}
