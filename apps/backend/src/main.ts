import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cors());

  const port = app.get(ConfigService).get('port');
  await app.listen(port || 3000);
}
bootstrap();
