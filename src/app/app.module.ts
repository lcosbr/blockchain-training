import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Block, BlockchainService } from 'projects/blockchain/src/public_api';
import { SendTransactionComponent } from './send-transaction/send-transaction.component';
import { BalanceComponent } from './balance/balance.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlockComponent } from './block/block.component';
import { TransactionButtonComponent } from './transaction-button/transaction-button.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MineButtonComponent } from './mine-button/mine-button.component';
import { TransactionsDatatableComponent } from './transactions-datatable/transactions-datatable.component';
import { BlocksDatatableComponent } from './blocks-datatable/blocks-datatable.component';
import { PendingTransactionsDatatableComponent } from './pending-transactions-datatable/pending-transactions-datatable.component';

// Import Datatables
import { DataTablesModule } from 'angular-datatables';

// NGX-BootstrapImports
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';


const GenesisProvider = () => {
  return new Block(1, 12312, [], 'GENESIS', '0aGenesisBlock', '00', 2);
};

@NgModule({
  declarations: [
    AppComponent,
    SendTransactionComponent,
    BalanceComponent,
    DashboardComponent,
    BlockComponent,
    TransactionButtonComponent,
    FooterComponent,
    HeaderComponent,
    MineButtonComponent,
    TransactionsDatatableComponent,
    BlocksDatatableComponent,
    PendingTransactionsDatatableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    DataTablesModule,
  ],
  providers: [{
    provide: 'GENESIS_BLOCK',
    useFactory: GenesisProvider
  },
  BlockchainService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
