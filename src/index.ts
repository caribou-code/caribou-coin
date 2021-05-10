import Block from './block';
import BlockChain from './blockchain';

console.log('Running application...');

const caribouCoin = new BlockChain();

caribouCoin.addBlock(new Block(1, Date.now(), { amount: 20, recipient: 'Anwen', sender: 'Robin' }));
caribouCoin.addBlock(new Block(2, Date.now(), { amount: 15, recipient: 'Gwenno', sender: 'Rhian' }));

console.log(JSON.stringify(caribouCoin, null, 2));

console.log('Is blockchain valid?', caribouCoin.isChainValid());
