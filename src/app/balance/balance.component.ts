import { Component, OnInit, Input, Inject } from '@angular/core';
import { Block, Transaction, BlockchainService } from 'projects/blockchain/src/public_api';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
  @Input() chain: Block[];

  private owner: string;
  private value: number;
  public initNoResult = true;
  public resultIsValid = false;
  public balance: { owner: string; value: number; totalOfTransactions: number, blocksEnvolved: number };
  public searchByReceiptForm: FormGroup;

  constructor(@Inject(BlockchainService) private blockchainService: BlockchainService) {
    this.chain = blockchainService.blockchain.chain;
  }

  ngOnInit() {
    this.balance = { owner: this.owner, value: this.value, totalOfTransactions: 0, blocksEnvolved: 0};
  }

  getBalance(owner: string) {
    this.owner = owner;
    this.value = 0;
    const chain = this.chain;
    let totalOfTransactions = 0;
    let blocksCounter = 0;
    let validatorRecipientBlock = false;

    for (const blocks of chain) {
      for (const transaction of blocks.transactions) {
        if (transaction.recipient === this.owner) {
            totalOfTransactions++;
            this.value = Number(transaction.amount) + this.value;
            validatorRecipientBlock = true;
        }
      }
      if (validatorRecipientBlock) {
        blocksCounter++;
        validatorRecipientBlock = false;
      }
      if (totalOfTransactions === 0) {
          this.resultIsValid = false;
      } else {
        this.resultIsValid = true;
      }

    }
    this.initNoResult = false;
    this.balance.owner = this.owner;
    this.balance.value = this.value;
    this.balance.totalOfTransactions = totalOfTransactions;
    this.balance.blocksEnvolved = blocksCounter;
  }
}
