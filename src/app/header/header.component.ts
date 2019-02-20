import { Component, Inject } from '@angular/core';
import { BlockchainService, Blockchain } from 'projects/blockchain/src/public_api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public isValid: boolean;
  public blockchain: Blockchain;

  constructor(@Inject(BlockchainService) private blockchainService: BlockchainService) {
    this.blockchain = this.blockchainService.blockchain;
    this.isValid = this.blockchain.isValidChain(this.blockchain);
  }

}
