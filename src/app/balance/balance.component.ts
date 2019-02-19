import { Component, OnInit, Input, Inject } from '@angular/core';
import { Block, Transaction, BlockchainService } from 'projects/blockchain/src/public_api';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
  @Input() chain: Block[];

  private owner: string;
  private value: number;
  public balance: { owner: string; value: number };

  constructor(@Inject(BlockchainService) private blockchainService: BlockchainService) {
    this.chain = blockchainService.blockchain.chain;
  }

  ngOnInit() {
    this.balance = { owner: this.owner , value: this.value };
  }

  getBalance(owner: string) {
    this.owner = owner;
    this.value = 0;
    const chain = this.chain;
    for (const blocks of chain) {
      for (const transaction of blocks.transactions) {
        if (transaction.recipient === this.owner) {
            this.value = Number(transaction.amount) + this.value;
        }
      }
    }
    this.balance.owner = this.owner;
    this.balance.value = this.value;
  }
}
