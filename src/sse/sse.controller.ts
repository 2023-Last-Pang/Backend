import { Controller, MessageEvent, Sse } from '@nestjs/common';
import { interval, map, Observable } from 'rxjs';

@Controller('sse')
export class SseController {
  // 10초에 한번씩 서버 시간 전송
  @Sse('time')
  sse(): Observable<MessageEvent> {
    return interval(5000).pipe(
      map(() => ({
        data: { unixTime: Math.floor(new Date().getTime() / 1000) },
      })),
    );
  }
}
