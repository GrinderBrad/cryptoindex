import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const AmqpListenerApp = await NestFactory.createMicroservice(
    AppModule,
    {
      transport: Transport.RMQ,
      logger: new Logger(),
      options: {
        urls: [
          `amqp://${process.env.AMQP_USER}:${process.env.AMQP_PASSWORD}@${process.env.AMQP_HOST}:${process.env.AMQP_PORT}`,
        ],
        queue: process.env.AMQP_ORDER_QUEUE_NAME,
        prefetchCount: 1,
      },
    },
  );
  await AmqpListenerApp.listen();
  Logger.log(`AMQP listener started`, 'MAIN');
}
bootstrap();
