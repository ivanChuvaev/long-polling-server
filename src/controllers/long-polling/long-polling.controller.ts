import { Controller, Get } from '@nestjs/common';
import { TimerService } from 'src/services/timer/timer.service';

@Controller('long-polling')
export class LongPollingController {
  constructor(private readonly timerService: TimerService) {}

  @Get('tick-one-second')
  async tickOneSecond(): Promise<void> {
    return this.timerService.waitOneSecondTimerTick();
  }

  @Get('tick-five-seconds')
  async tickFiveSeconds(): Promise<void> {
    return this.timerService.waitFiveSecondsTimerTick();
  }

  @Get('tick-ten-seconds')
  async tickTenSeconds(): Promise<void> {
    return this.timerService.waitTenSecondsTimerTick();
  }
}
