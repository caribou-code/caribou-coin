// https://www.youtube.com/watch?v=zVqczFZr124
import Block from './block';

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
      },
      'x'
    );
  }

  addBlock(block: Block) {
    block.previousHash = this.chain[this.chain.length - 1].hash;
    block.hash = block.calculateHash();
    this.chain.push(block);
  }

  isChainValid() {
    return this.chain.every((block, index) => {
      if (index === 0) return true;
      const isHashCorrect = block.hash === block.calculateHash();
      const isHashMatching = block.previousHash === this.chain[index - 1].hash;
      return isHashCorrect && isHashMatching;
    });
  }
}
