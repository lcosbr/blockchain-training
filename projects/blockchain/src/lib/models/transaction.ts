import { v4 as uuid} from 'uuid';

export class Transaction {
    public id: string;
    public amount: number;
    public sender: string;
    public recipient: string;
    public timestamp: string;

    constructor(
        amount: number,
        sender: string,
        recipient: string,
        timestamp: string
    ) {
        this.amount = amount;
        this.sender = sender;
        this.recipient = recipient;
        this.id = uuid();
        this.timestamp = timestamp;
    }
}
