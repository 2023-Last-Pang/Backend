import {
  Injectable,
  Logger,
  MiddlewareConsumer,
  Module,
  NestMiddleware,
  NestModule,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { FirebaseModule } from './firebase/firebase.module';
import { AuthModule } from './auth/auth.module';
import { MessageModule } from './message/message.module';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';
    res.on('finish', () => {
      const { statusCode } = res;
      this.logger.log(
        `${method} ${statusCode} - ${originalUrl} - ${userAgent}`,
      );
    });
    next();
  }
}

@Module({
  imports: [FirebaseModule, AuthModule, MessageModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
