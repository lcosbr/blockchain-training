import { Component, OnInit, Input, Inject, TemplateRef, ContentChild } from '@angular/core';
import { BlockchainService, Transaction } from 'projects/blockchain/src/public_api';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-send-transaction',
  templateUrl: './send-transaction.component.html',
  styleUrls: ['./send-transaction.component.scss']
})
export class SendTransactionComponent implements OnInit {
  @Input() private valorDaVariavel: string;
  public variavel: string;
  public confirmTransaction = false;
  public transaction: Transaction;

  public modalRef: BsModalRef;
  public modalConfig = {
    class: 'modal-dialog-centered'
  };

  constructor(@Inject(BlockchainService) private blockchainService: BlockchainService, private modalService: BsModalService) {
  }

  ngOnInit() {
    this.variavel = this.valorDaVariavel;
  }

  onSend(amount: number, recipient: string, templateConfirmed: TemplateRef<any>, templateNotConfirmed: TemplateRef<any>) {
    const id = this.blockchainService.blockchain.nodeUrl;
    this.transaction = new Transaction(amount, id, recipient, String(Date.now()));
    if (this.blockchainService.addTransaction(this.transaction)) {
      this.confirmTransaction = true;
      this.openModal(templateConfirmed);
    } else {
      this.openModal(templateNotConfirmed);
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.modalConfig);
  }

}
