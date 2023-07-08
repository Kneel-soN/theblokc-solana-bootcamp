import Web3 from '@solana/web3.js'

const pubkey = new Web3.PublicKey('9b1p8nUdXaKpZkAKNeDpgJM6QwJ5z2TEdfAftdns6ngK')

async function main (){

const conn = new Web3.Connection(Web3.clusterApiUrl('testnet'))

const bal = await conn.getBalance(pubkey)

console.log('balance', bal)

const accinfo = await conn.getAccountInfo(pubkey)
console.log('Account Info:', (accinfo))
}
main()