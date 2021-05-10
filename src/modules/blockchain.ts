import Block from './block';

export default class BlockChain {
  chain: Block[];

  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    const data = {
      amount: 10,
      recipient: 'Erin',
      sender: 'Rich',
    };

    return new Block(0, Date.now(), data, 'x');
  }

  addBlock(block: Block) {
    block.previousHash = this.chain[this.chain.length - 1]?.hash;
    block.hash = block.calculateHash();
    block.mineBlock();
    this.chain.push(block);
  }

  isChainValid() {
    return this.chain.every((block, index) => {
      if (index === 0) return true;
      const isHashCorrect = block.hash === block.calculateHash();
      const isHashMatching = block.previousHash === this.chain[index - 1]?.hash;
      return isHashCorrect && isHashMatching;
    });
  }
}
