import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration, { AppConfig } from './configuration';
import { PopulateService } from './populate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AppConfig, true>) => {
        const url = configService.get('dbUrl');
        return {
          type: 'postgres',
          synchronize: true,
          url,
          entities,
        };
      },
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, PopulateService],
})
export class AppModule {}
