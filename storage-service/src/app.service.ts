import { Inject, Injectable, Logger, ServiceUnavailableException } from "@nestjs/common";
import { RedisClientType } from "@redis/client";

@Injectable()
export class AppService {
  constructor(
    @Inject("REDIS_CLIENT")
    private readonly redis: RedisClientType
  ) {}
  async saveTickers(provider: string, tickers: any) {
    try {
      const saveOp = await this.redis.set(provider, JSON.stringify(tickers))
    } catch (error) {
      Logger.error(error)
      throw new ServiceUnavailableException()
    }
  }
  getHello(): string {
    return "Hello World!";
  }
}
