import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlarmsModule } from './alarms/alarms.module';

@Module({
  imports: [AlarmsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
