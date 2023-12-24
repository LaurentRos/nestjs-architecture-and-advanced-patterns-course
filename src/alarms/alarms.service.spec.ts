import { Test, TestingModule } from '@nestjs/testing';
import { AlarmsFacade } from './alarms.service';

describe('AlarmsService', () => {
  let service: AlarmsFacade;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlarmsFacade],
    }).compile();

    service = module.get<AlarmsFacade>(AlarmsFacade);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
