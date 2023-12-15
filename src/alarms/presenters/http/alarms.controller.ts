import { Body, Controller, Get, Post } from '@nestjs/common';
import { AlarmsService } from '../../alarms.service';
import { CreateAlarmDto } from './dto/create-alarm.dto';
import { CreateAlarmCommand } from 'src/alarms/application/commands/create-alarm.command';

@Controller('alarms')
export class AlarmsController {
  constructor(private readonly alarmsService: AlarmsService) {}

  @Post()
  create(@Body() dto: CreateAlarmDto) {
    const command = new CreateAlarmCommand(dto.name, dto.severity);
    return this.alarmsService.create(command);
  }

  @Get()
  findAll() {
    return this.alarmsService.findAll();
  }
}