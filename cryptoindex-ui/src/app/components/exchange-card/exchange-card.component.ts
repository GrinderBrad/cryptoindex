import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exchange-card',
  templateUrl: './exchange-card.component.html',
  styleUrls: ['./exchange-card.component.scss']
})
export class ExchangeCardComponent {
  constructor(private router: Router) {}

  @Input() exchange: any = {}

  open(slug: string) {
    this.router.navigate([`/exchange/${slug}`])
  }
}
