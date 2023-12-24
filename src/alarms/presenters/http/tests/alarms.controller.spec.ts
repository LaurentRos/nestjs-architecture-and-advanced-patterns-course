import { Test, TestingModule } from '@nestjs/testing';
import { AlarmsController } from '../alarms.controller';
import { AlarmsFacade } from '../../../alarms.service';

describe('AlarmsController', () => {
  let controller: AlarmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlarmsController],
      providers: [AlarmsFacade],
    }).compile();

    controller = module.get<AlarmsController>(AlarmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
