import { Controller, Get, Param } from '@nestjs/common';
import { ExchangeService } from './exchange.service';

@Controller()
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Get('tickers/:exchange')
  getTickersFromExchange(@Param('exchange') exchange: string): Promise<any> {
    return this.exchangeService.getTickerForExchange(exchange);
  }
}
