import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { KrakenProviderService } from "./services/kraken.provider/kraken.provider.service";

@Module({
  providers: [AppService, KrakenProviderService],
})
export class AppModule {}
