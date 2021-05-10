import sha256 from 'crypto-js/sha256';

interface Data {
  amount: number;
  recipient: string;
  sender: string;
}

export default class Block {
  data: Data;
  hash: string;
  id: number;
  previousHash?: string;
  timestamp: number;

  constructor(
    id: number,
    timestamp: number,
    data: Data,
    previousHash?: string
  ) {
    this.id = id;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    const stringifiedData = JSON.stringify(this.data);
    const hash = sha256(`${this.id}${this.previousHash}${this.timestamp}${stringifiedData}`);
    return hash.toString();
  }
}
