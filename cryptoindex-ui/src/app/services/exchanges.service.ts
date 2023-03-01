import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ExchangesService {

  constructor(private readonly api: ApiService) { }

  getExchangesList() {
    return this.api.executeRequest('get', '/exchanges')
  }

  getExchangeById(id: string) {
    return this.api.executeRequest('get', `/exchanges/${id}`)
  }
}