import { ClassSerializerInterceptor, Module, ValidationPipe } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'

import configuration from './config/configuration'
import connectionOptions from './config/typeorm'
import { AuthModule } from './modules/auth/auth.module'
import { EmailModule } from './modules/email/email.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.MODE === 'production',
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(connectionOptions),
    AuthModule,
    EmailModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          transform: true,
          forbidUnknownValues: true,
          whitelist: true,
        }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
