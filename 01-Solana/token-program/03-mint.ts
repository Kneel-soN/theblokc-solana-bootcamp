import * as Web3 from '@solana/web3.js'
import 'dotenv/config'
import base58 from 'bs58'
import * as token from '@solana/spl-token'

async function main() {
    const conn = new Web3.Connection(Web3.clusterApiUrl('testnet'))
    const b58dpk= base58.decode(process.env.spk || '')
    const signer = Web3.Keypair.fromSecretKey(b58dpk)
    const tokenAccount = new Web3.PublicKey('5rqU9R4ifFEKJVGtJQjwrghUUkezTW1hYUR21Y5ZXuPW')
    const mint = new Web3.PublicKey('rTGagRf3fqSbs3wZvL6bfp376uQRmf98db3XsRhVmnn')
    const owner = new Web3.PublicKey('9b1p8nUdXaKpZkAKNeDpgJM6QwJ5z2TEdfAftdns6ngK')
    
    const tokenMint = await token.mintTo(
        conn,
        signer,
        mint,
        tokenAccount,
        owner,
        5)
   console.log("Minted: " ,tokenMint)
}


main()
