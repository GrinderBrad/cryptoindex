import { Inject, Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { RedisClientType } from "@redis/client";
import { KrakenProviderService } from "./services/kraken.provider/kraken.provider.service";

@Injectable()
export class AppService {
  constructor(
    @Inject('REDIS_CLIENT')
    private readonly redis: RedisClientType,
    private krakenProvider: KrakenProviderService
  ) {};

  @Cron('*/15 * * * * *')
  async getTickersFromAllProviders() {
    this.redis.set(this.krakenProvider.providerName(), JSON.stringify(await this.krakenProvider.getTickers()))
  }
}
