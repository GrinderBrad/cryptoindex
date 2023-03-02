import {
  Inject,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { RedisClientType } from '@redis/client';

@Injectable()
export class ExchangeService {
  constructor(
    @Inject('REDIS_CLIENT')
    private readonly redis: RedisClientType,
  ) {}

  async getTickerForExchange(exchangeName: string): Promise<any> {
    try {
      const tickers = await this.redis.get(exchangeName.toUpperCase());
      const lastUpdatedAt = await this.redis.get(
        `${exchangeName.toUpperCase()}_lastUpdated`,
      );

      return {
        name: exchangeName,
        tickers: (tickers && JSON.parse(tickers)) || {},
        lastUpdatedAt: lastUpdatedAt || null,
      };
    } catch (error) {
      Logger.error(error);
      throw new ServiceUnavailableException();
    }
  }
}
