import { Component, Inject } from '@angular/core';
import { BlockchainService, Blockchain, Transaction, BlockchainComponent } from 'projects/blockchain/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blockchain-wallet-training';
  public isValid: boolean;
  public blockchain: Blockchain;

  constructor(@Inject(BlockchainService) private blockchainService: BlockchainService){
    this.blockchain = this.blockchainService.blockchain;
    this.isValid = this.blockchain.isValidChain(this.blockchain);
  }

  onMine(): boolean{
    return this.blockchainService.mine();
  }
}
