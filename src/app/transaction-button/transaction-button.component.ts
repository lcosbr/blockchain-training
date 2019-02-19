import { Component, OnInit, Input, Inject, TemplateRef, ContentChild } from '@angular/core';
import { BlockchainService, Blockchain } from 'projects/blockchain/src/public_api';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-transaction-button',
  templateUrl: './transaction-button.component.html',
  styleUrls: ['./transaction-button.component.scss']
})
export class TransactionButtonComponent implements OnInit {

  public blockchain: Blockchain;
  public modalRef: BsModalRef;
  public modalconfig = {
    class: 'modal-dialog-centered'
  };


  constructor(@Inject(BlockchainService) private blockchainService: BlockchainService, private modalService: BsModalService) {
    this.blockchain = this.blockchainService.blockchain;
  }

  ngOnInit() {
  }

  openModal(templateTransactionAvail: TemplateRef<any>, templateTransactionNonAvail: TemplateRef<any>) {
    if (this.blockchain.pendingTransactions.length >= 1) {
      this.modalRef = this.modalService.show(templateTransactionAvail, this.modalconfig);
    } else {
      this.modalRef = this.modalService.show(templateTransactionNonAvail, this.modalconfig);
    }
  }

}
