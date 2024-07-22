import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { TimerService } from 'src/services/timer/timer.service';
import { LongPollingController } from 'src/controllers/long-polling/long-polling.controller';

@Module({
  imports: [],
  controllers: [AppController, LongPollingController],
  providers: [AppService, TimerService],
})
export class AppModule {}
