import * as Web3 from '@solana/web3.js'
import 'dotenv/config'
import base58 from 'bs58'
import {SystemProgram, LAMPORTS_PER_SOL} from '@solana/web3.js'

//console.log(process.env.spk)
const sender = 'JDLKNv28pBNsgPjX4DkWMHGbfQsw7AuW42RbavRd63BU'
const receiver = '9b1p8nUdXaKpZkAKNeDpgJM6QwJ5z2TEdfAftdns6ngK'
async function main() {

    const transact = new Web3.Transaction();

   const sendSol = SystemProgram.transfer({
        fromPubkey: new Web3.PublicKey(sender),
        toPubkey: new Web3.PublicKey(receiver),
        lamports: 1 * LAMPORTS_PER_SOL,

    })
    transact.add(sendSol)
     const b58dpk= base58.decode(process.env.spk2 || '')
    const keyPairFromSecret = Web3.Keypair.fromSecretKey(b58dpk)

    const conn = new Web3.Connection(Web3.clusterApiUrl('testnet'))
    const txhash =await Web3.sendAndConfirmTransaction(conn,transact,[keyPairFromSecret])

  
    console.log('txHash', txhash)
}
console.log('You Transfered 1 Sol to ', receiver )
main()
