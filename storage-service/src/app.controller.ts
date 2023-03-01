import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { validateOrReject } from 'class-validator';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('save_ticker')
  public async saveTicker(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    try {
      // const orderDto = new ExchangePlatformOrderAMQPdto(data);
      // await validateOrReject(orderDto);

      const channel = context.getChannelRef();
      const orginalMessage = context.getMessage();

      console.log('save ticker operation', data);

      const newOrders =
        await this.appService.saveTickers(
          data.provider,
          data.tickers
        );
      console.log(newOrders);
      channel.ack(orginalMessage);
    } catch (error) {
      Logger.error(
        error.message || error,
        '',
        `${AppController.name}::save_ticker`,
      );
    }
  }
}

