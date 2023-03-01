import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { KrakenProviderService } from "./services/kraken.provider/kraken.provider.service";

@Injectable()
export class AppService {
  constructor(
    private krakenProvider: KrakenProviderService
  ) {};

  @Cron('*/15 * * * * *')
  async getTickersFromAllProviders() {
    return {
      [this.krakenProvider.providerName()]: await this.krakenProvider.getTickers()
    }
  }
}
