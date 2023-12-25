import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AcknowledgeAlarmCommand } from 'src/alarms/application/commands/acknowledge-alarm.command';
import { CreateAlarmCommand } from 'src/alarms/application/commands/create-alarm.command';
import { GetAlarmsQuery } from 'src/alarms/application/queries/get-alarms.query';

@Injectable()
export class AlarmsFacade {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create(createAlarmCommand: CreateAlarmCommand) {
    return this.commandBus.execute(createAlarmCommand);
  }

  findAll() {
    const query = new GetAlarmsQuery();
    return this.queryBus.execute(query);
  }

  acknowledge(id: string) {
    return this.commandBus.execute(new AcknowledgeAlarmCommand(id));
  }
}
