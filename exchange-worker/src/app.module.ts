import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { KrakenProviderService } from "./services/kraken.provider/kraken.provider.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, KrakenProviderService],
})
export class AppModule {}
