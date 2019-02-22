import { Component, OnInit, Inject, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { BlockchainService, Block, Transaction, Blockchain } from 'projects/blockchain/src/public_api';
import { Subject, Subscription } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-pending-transactions-datatable',
  templateUrl: './pending-transactions-datatable.component.html',
  styleUrls: ['./pending-transactions-datatable.component.scss']
})
export class PendingTransactionsDatatableComponent implements  AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  public blockchain: Blockchain;
  public chainSubscription: Subscription;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();


  constructor(@Inject(BlockchainService) private blockchainService: BlockchainService) {
    this.blockchain = blockchainService.blockchain;
  }
  ngOnInit() {
    this.chainSubscription = this.blockchainService.blockchainChange.subscribe(
      (chain: Block[]) => {
        this.rerender();
      }
    );
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthChange: false,
      order: [ 1, 'desc' ]
    };
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
