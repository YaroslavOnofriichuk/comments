import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from 'src/services/auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dbConf } from '../config';

@Module({
  imports: [
    AuthModule,
    JwtModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConf],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
