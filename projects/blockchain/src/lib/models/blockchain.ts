import { Block } from './block';
import { Transaction } from './transaction';
import { v4 as uuid } from 'uuid';
import { sha256 } from 'hash.js';
import { BlockData } from './block-data';


export class Blockchain {
    public chain: Block[];
    public pendingTransactions: Transaction[] = [];
    public nodeUrl: string;
    public networdNodes: string[] = [];
    private chainDifficulty: number;


    constructor(GENESIS_BLOCK: Block, chainDifficulty = 2) {
        this.chain = [GENESIS_BLOCK];
        this.nodeUrl = uuid();
        this.chainDifficulty = chainDifficulty;
    }

    newBlock(nonce: string | number, previousHash: string, hash: string): Block {
        const newBlock = new Block(
            this.chain.length + 1,
            Date.now(),
            this.pendingTransactions,
            nonce.toString(),
            hash,
            previousHash,
            this.chainDifficulty
        );
        this.pendingTransactions = [];
        this.chain.push(newBlock);
        return newBlock;
    }

    getLatestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    hashBlock(
        previousHash: string,
        blockData: BlockData,
        nonce: string | number
    ): string {
        const data = previousHash + JSON.stringify(blockData) + nonce.toString();

        const hash = sha256().update(data).digest('hex');
        return hash;
    }

    proofOfWorkNonce(
        previousHash: string,
        currentBlockData: BlockData
    ): string {
        let nonce = 0;
        let hash = this.hashBlock(previousHash, currentBlockData, nonce);

        while (hash.substring(0, this.chainDifficulty) !== this.chain[0].hash.substring(0, this.chainDifficulty)) {
            nonce++;
            hash = this.hashBlock(previousHash, currentBlockData, nonce);
        }
        return nonce.toString();
    }

    validateBlock(block: Block, previousBlock: Block): boolean {
        if (block.previousHash !== previousBlock.hash) {
            return false;
        }

        const validatedBlockHash = this.hashBlock(block.previousHash, new BlockData(block), block.nonce);
        if (validatedBlockHash !== block.hash) {
            return false;
        }

        return block.hash.substr(0, this.chainDifficulty) ===
            this.chain[0].hash.substr(0, this.chainDifficulty);
    }

    isValidChain(blockchain: Blockchain): boolean {
        const testChain = blockchain.chain;
        const invalidBlocks = testChain.filter((block, index) => {
            const isSameHash = block.hash === this.chain[index].hash;
            const isSamePreviousHash = block.previousHash === this.chain[index].previousHash;
            return !isSameHash
                || !isSamePreviousHash
                || (index > 0 && !this.validateBlock(block, testChain[index - 1]));
        });
        return invalidBlocks.length === 0;
    }

    addTransactionToPending(transaction: Transaction): number {
        this.pendingTransactions.push(transaction);
        return this.getLatestBlock().index + 1;
    }

    newTransaction(amount: number, sender: string, recipient: string): Transaction {
        const transaction = new Transaction(amount, sender, recipient, String(Date.now()));
        return transaction;
    }

    listAllTransactions(): Transaction[] {
      const transactions: Transaction[] = [];
      for (const block of this.chain) {
        for (const transaction of block.transactions) {
          transactions.push(transaction);
        }
      }
      return transactions;
    }

    searchBlockTransactionIndex(transaction: Transaction): number {
      for (const block of this.chain) {
        for (const transactionchain of block.transactions) {
          if (transactionchain === transaction) {
            return block.index;
          }
        }
      }
      return 1;
    }

}
