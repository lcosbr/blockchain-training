import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { BlockchainService, Block } from 'projects/blockchain/src/public_api';
import { Subscription, Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-blocks-datatable',
  templateUrl: './blocks-datatable.component.html',
  styleUrls: ['./blocks-datatable.component.scss']
})
export class BlocksDatatableComponent
  implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(DataTableDirective, { static: true })
  dtElement: DataTableDirective;

  public chain: Block[];
  public chainSubscription: Subscription;
  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject();

  constructor(
    @Inject(BlockchainService) private blockchainService: BlockchainService
  ) {
    this.chain = blockchainService.blockchain.chain;
  }

  ngOnInit() {
    this.chainSubscription = this.blockchainService.blockchainChange.subscribe(
      (chain: Block[]) => {
        this.chain = chain;
        this.rerender();
      }
    );
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthChange: false,
      order: [0, 'desc']
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
