import { Component, OnInit, Inject } from '@angular/core';
import { BlockchainService, Blockchain, Block, Transaction } from 'projects/blockchain/src/public_api';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public blockchain: Blockchain;
  public chain: Block[];
  public transactions: Transaction[] = [];

  constructor(@Inject(BlockchainService) private blockchainService: BlockchainService) {
    this.blockchain = blockchainService.blockchain;
    this.chain = blockchainService.blockchain.chain;
   }

  ngOnInit() {
   }

   listAllTransactionsDone() {
    this.transactions = this.blockchain.listAllTransactions();
   }

}
