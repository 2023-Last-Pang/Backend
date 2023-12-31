import { Controller, MessageEvent, Sse } from '@nestjs/common';
import { interval, map, Observable } from 'rxjs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('SSE')
@Controller('/api/v1/sse')
export class SseController {
  // 10초에 한번씩 서버 시간 전송
  @ApiOperation({
    summary: 'SSE로 10초에 한번씩 서버 시간(ms) unixTimestamp로 전송',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
    content: {
      'text/event-stream': {
        schema: {
          type: 'object',
          properties: {
            unixTime: {
              example: 1627666800,
              type: 'number',
            },
          },
        },
      },
    },
  })
  @Sse('time')
  sse(): Observable<MessageEvent> {
    return interval(10000).pipe(
      map(() => ({
        data: { unixTime: Math.floor(new Date().getTime()) },
      })),
    );
  }
}
