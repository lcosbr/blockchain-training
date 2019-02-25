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
  public initInfoNoResult = true;
  public initTransactionNoResult = true;
  public resultInfoIsValid = false;
  public resultTransactionIsValid = false;
  public userInfo: { owner: string; value: number; totalOfTransactions: number, blocksEnvolved: number };
  public transactionInfo: { transactionID: string;
                            owner: string;
                            senderUUID: string;
                            blockIndex: number;
                            amount: number;
                            dateCreated: number};
  public searchByReceiptForm: FormGroup;


  constructor(@Inject(BlockchainService) private blockchainService: BlockchainService) {
    this.chain = blockchainService.blockchain.chain;
  }

  ngOnInit() {
    this.userInfo = { owner: this.owner, value: this.value, totalOfTransactions: 0, blocksEnvolved: 0};
    this.transactionInfo = {transactionID: 'GenesisID',
                            owner: this.owner,
                            senderUUID: this.owner,
                            blockIndex: 0,
                            amount: 0,
                            dateCreated: 123321};
  }

  getReceipt(owner: string) {
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
          this.resultInfoIsValid = false;
      } else {
        this.resultInfoIsValid = true;
      }

    }
    this.initInfoNoResult = false;
    this.initTransactionNoResult = true;
    this.userInfo.owner = this.owner;
    this.userInfo.value = this.value;
    this.userInfo.totalOfTransactions = totalOfTransactions;
    this.userInfo.blocksEnvolved = blocksCounter;
  }

  getTransaction(transactionid: string) {
    const transactions = this.blockchainService.blockchain.listAllTransactions();
    let counter = 0;
    for (const transaction of transactions) {
        if (transaction.id === transactionid) {
          counter++;
          this.transactionInfo.transactionID = transaction.id;
          this.transactionInfo.owner = transaction.recipient;
          this.transactionInfo.senderUUID = transaction.sender;
          this.transactionInfo.amount = transaction.amount;
          this.transactionInfo.dateCreated = transaction.timestamp;
          this.transactionInfo.blockIndex =
            this.blockchainService.blockchain.searchBlockTransactionIndex(transaction);
        }
    }
    if (counter === 0) {
      this.resultTransactionIsValid = false;
    } else {
      this.resultTransactionIsValid = true;
    }
    this.initTransactionNoResult = false;
    this.initInfoNoResult = true;
  }


}
