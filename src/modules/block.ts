import sha256 from 'crypto-js/sha256';

import { Mining } from '../enums';

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
  nonce: number;
  puzzle: string;

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
    this.nonce = 0;
    this.puzzle = this.calculatePuzzle();
  }

  calculateHash() {
    const data = JSON.stringify(this.data);
    const hash = sha256(`${this.id}${this.previousHash}${this.timestamp}${data}`);
    return hash.toString();
  }

  calculatePuzzle() {
    return sha256(`${this.hash}${this.nonce}`).toString();
  }

  isPuzzleCorrect() {
    const puzzleStart = this.puzzle.substring(0, Mining.Difficulty);
    const expectedPuzzleStart = Array(Mining.Difficulty + 1).join('0');
    return puzzleStart === expectedPuzzleStart;
  }

  mineBlock() {
    while (!this.isPuzzleCorrect()) {
      this.nonce += 1;
      this.puzzle = this.calculatePuzzle();
    }
  }
}
