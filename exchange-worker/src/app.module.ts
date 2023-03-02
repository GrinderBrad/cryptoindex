import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { AmqpProvider } from "./amqp.service";
import { AppService } from "./app.service";
import { RedisModule } from "./redis/redis/redis.module";
import { KrakenProviderService } from "./services/kraken.provider/kraken.provider.service";

@Module({
  imports: [RedisModule, ConfigModule.forRoot(), ScheduleModule.forRoot()],
  providers: [AppService, KrakenProviderService, AmqpProvider],
})
export class AppModule {}
