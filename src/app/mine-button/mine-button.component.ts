import { Component, OnInit, Inject, TemplateRef } from '@angular/core';
import { Blockchain, BlockchainService, Block } from 'projects/blockchain/src/public_api';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-mine-button',
  templateUrl: './mine-button.component.html',
  styleUrls: ['./mine-button.component.scss']
})
export class MineButtonComponent {
  public blockchain: Blockchain;
  public lastBlock: Block;
  public modalRef: BsModalRef;
  public modalconfig = {
    class: 'modal-dialog-centered'
  };

  constructor(@Inject(BlockchainService) private blockchainService: BlockchainService, private modalService: BsModalService) {
    this.blockchain = blockchainService.blockchain;
  }

  onMine(templateMineSuccess: TemplateRef<any>, templateMineNoSuccess: TemplateRef<any>): boolean {
    if (this.blockchainService.mine()) {
      this.modalRef = this.modalService.show(templateMineSuccess, this.modalconfig);
      this.lastBlock = this.blockchain.getLatestBlock();
      return true;
    } else {
      this.modalRef = this.modalService.show(templateMineNoSuccess, this.modalconfig);
      return false;
    }
  }

}
