import { Block } from './block';
import { Transaction } from './transaction';


export class BlockData {
    public transactions: Transaction[];
    public index: number;

    constructor(block: Block){
        this.transactions = block.transactions;
        this.index = block.index;
    }
}
