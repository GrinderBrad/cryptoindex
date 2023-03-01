import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, Subscription, switchMap } from 'rxjs';
import { ExchangesService } from 'src/app/services/exchanges.service';

@Component({
  selector: 'app-exchange-view',
  templateUrl: './exchange-view.component.html',
  styleUrls: ['./exchange-view.component.scss']
})
export class ExchangeViewComponent {
  public subscriptions: Subscription[] = []
  public data: any = {
    name: 'Kraken',
    info: 'info info',
    assetPairs: [{
      base: 'BTC',
      quote: 'USD',
      ohlc: [],
      lastPrice: '27000'
    }, {
      base: 'LTC',
      quote: 'USD',
      ohlc: [],
      lastPrice: '180'
    }]
  };
  constructor(
    private route: ActivatedRoute,
    private exchangesService: ExchangesService
  ) { }
  async ngOnInit() {
    // try {
    //   const routeSubscription = this.route.params.pipe(
    //     map(params => params?.['id']),
    //     filter(v => !!v),
    //     switchMap(
    //       id => this.exchangesService.getExchangeById(id)
    //     )
    //   ).subscribe(
    //     res => {
    //       this.data = res
    //     }
    //   )
    //   this.subscriptions.push(routeSubscription)
    // } catch (error) {
    //   console.log(error);
    // }
  }
}
