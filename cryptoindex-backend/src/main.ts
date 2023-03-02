import { NestFactory } from '@nestjs/core';
import { ExchangeModule } from './exchange.module';

async function bootstrap() {
  const app = await NestFactory.create(ExchangeModule);
  await app.listen(3000);
}
bootstrap();
