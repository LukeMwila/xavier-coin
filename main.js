const moment = require ('moment')
const SHA256 = require('crypto-js/sha256')

class Block{
    /**
     * 
     * @param {*} index - the position of the block on the chain
     * @param {*} timestamp - the timestamp of the blocks creation
     * @param {*} data - includes any type of data we want to associate with this block. In case of a currency,
     * want to store details of how much money was transferred, the sender and the receiver
     * @param {*} previousHash  - contains the hash of the previous block. This maintains the integrity of our blockchain
     */
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index
        this.timestamp = timestamp 
        this.data = data 
        this.previousHash = previousHash
        this.hash = this.calculateHash()
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString()
    }
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()]
    }

    createGenesisBlock(){
        return new Block(0, this.getTimeStamp(), 'Genesis block', '0')
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1]
    }

    getTimeStamp(){
        return moment(new Date()).toISOString()
    }

    getNextIndex(){
        return this.chain.length
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash
        newBlock.hash = newBlock.calculateHash()
        this.chain = [...this.chain, newBlock]
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i - 1]

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false
            }

            return true
        }
    }
}

/**
 * Let's add some blocks to our blockchain!
 */

let xavierCoin = new BlockChain()
xavierCoin.addBlock(new Block(xavierCoin.getNextIndex(), xavierCoin.getTimeStamp(), { amountTransferred: 112 }))
xavierCoin.addBlock(new Block(xavierCoin.getNextIndex(), xavierCoin.getTimeStamp(), { amountTransferred: 12 }))
xavierCoin.addBlock(new Block(xavierCoin.getNextIndex(), xavierCoin.getTimeStamp(), { amountTransferred: 52 }))

xavierCoin.chain[1].data.amountTransferred = 3400

console.log('Is blockchain valid? ' + xavierCoin.isChainValid())

// console.log(JSON.stringify(xavierCoin, null, 4))