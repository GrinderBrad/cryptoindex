import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-exchanges-list',
  templateUrl: './exchanges-list.component.html',
  styleUrls: ['./exchanges-list.component.scss']
})
export class ExchangesListComponent implements OnInit{
  public data: any = [
    {
       name: 'Kraken',
       info: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    },
    {
      name: 'Binance',
      info: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
   },
   {
    name: 'Coinbase',
    info: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
  }
  ]
  constructor(private readonly api: ApiService) {}

  async ngOnInit() {
    console.log('loaded')
  }
}
