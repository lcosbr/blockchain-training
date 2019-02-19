import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SendTransactionComponent } from './send-transaction/send-transaction.component';
import { BalanceComponent } from './balance/balance.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CanSendGuard } from './can-send.guard';
import { TransactionButtonComponent } from './transaction-button/transaction-button.component';

const routes: Routes = [
  {
     path: 'send-transaction',
     component: SendTransactionComponent,
     canActivate: [CanSendGuard]
  },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'balance', component: BalanceComponent},
  { path: 'transaction-button', component: TransactionButtonComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
