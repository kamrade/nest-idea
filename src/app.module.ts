import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdeaModule } from './idea/idea.module';
import { HttpErrorFilter } from './shared/http-error-filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { UserModule } from './user/user.module';

@Module({
  imports: [ TypeOrmModule.forRoot(), IdeaModule, UserModule ],
  controllers: [AppController],
  providers: [
    AppService, 
    {
      // Filter http errors
      provide: APP_FILTER,
      useClass: HttpErrorFilter
    },
    {
      // Log all requests
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    }
  ],
})
export class AppModule {}
