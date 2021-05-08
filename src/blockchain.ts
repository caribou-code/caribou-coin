// https://www.youtube.com/watch?v=zVqczFZr124
import sha256 from 'crypto-js/sha256';

interface Data {
  amount: number;
  recipient: string;
  sender: string;
}

export class Block {
  data: Data;
  hash: string;
  index: number;
  previousHash?: string;
  timestamp: number;

  constructor(
    index: number,
    timestamp: number,
    data: Data,
    previousHash?: string,
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

export default class BlockChain {
  chain: any[];

  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(
      0,
      Date.now(),
      {
        amount: 10,
        recipient: 'Erin',
        sender: 'Rich',
      }
    );
  }

  addBlock(block: Block) {
    this.chain.push({
      ...block,
      hash: block.calculateHash(),
      previousHash: this.chain[this.chain.length - 1].hash
    });
  }
}
