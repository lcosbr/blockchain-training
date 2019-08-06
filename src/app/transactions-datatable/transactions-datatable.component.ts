import { Component, OnInit, Inject, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { BlockchainService, Block, Transaction, Blockchain } from 'projects/blockchain/src/public_api';
import { Subject, Subscription } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-transactions-datatable',
  templateUrl: './transactions-datatable.component.html',
  styleUrls: ['./transactions-datatable.component.scss']
})
export class TransactionsDatatableComponent implements  AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective, { static: true })
  dtElement: DataTableDirective;

  public blockchain: Blockchain;
  public transactions: Transaction[];
  public transactionBlockId: number;
  public chainSubscription: Subscription;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();


  constructor(@Inject(BlockchainService) private blockchainService: BlockchainService) {
    this.blockchain = blockchainService.blockchain;
    this.transactions = blockchainService.blockchain.listAllTransactions();
  }
  ngOnInit() {
    this.chainSubscription = this.blockchainService.blockchainChange.subscribe(
      (chain: Block[]) => {
        this.transactions = this.blockchain.listAllTransactions();
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

  searchBlockIndex(transaction: Transaction): number {
    return this.blockchain.searchBlockTransactionIndex(transaction);
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
