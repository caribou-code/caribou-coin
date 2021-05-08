interface Data {
  amount: number;
  recipient: string;
  sender: string;
}

export default class Block {
  data: Data;
  hash: string;
  index: number;
  previousHash: string;
  timestamp: number;

  constructor(
    index: number,
    timestamp: number,
    previousHash: string,
    data: Data,
  ) {
    this.data = data;
    this.hash = this.calculateHash();
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
  }

  calculateHash() {
    const stringifiedData = JSON.stringify(this.data);
    const hash = sha256(`${this.index}${this.previousHash}${this.timestamp}${stringifiedData}`);
    return hash.toString();
  }
}
