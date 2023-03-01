import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExchangeViewComponent } from './components/exchange-view/exchange-view.component';
import { ExchangesListComponent } from './components/exchanges-list/exchanges-list.component';

const routes: Routes = [
  {
    path: '',
    component: ExchangesListComponent,
  },
  {
    path: 'exchange/:id',
    component: ExchangeViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
