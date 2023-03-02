import { Inject, Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { RedisClientType } from "@redis/client";
import { KrakenProviderService } from "./services/kraken.provider/kraken.provider.service";
import amqp from 'amqplib';
import { AmqpProvider } from "./amqp.service";

@Injectable()
export class AppService {
  private logger = new Logger(AppService.name)
    constructor(
    private amqpProvider: AmqpProvider,
    private krakenProvider: KrakenProviderService
  ) {
    this.amqpProvider.init()
  };

  @Cron('*/10 * * * * *')
  async getTickersFromAllProviders() {
    try {
      const tickerPayload = {
        pattern: "save_ticker",
        data: {
            source: this.krakenProvider.providerName(),
            tickers: await this.krakenProvider.getTickers()
        }
      };
      await this.amqpProvider.publishTicker(tickerPayload)
    } catch (error) {
      this.logger.error(error, error.stack)
    }
  }
}
