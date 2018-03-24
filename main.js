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