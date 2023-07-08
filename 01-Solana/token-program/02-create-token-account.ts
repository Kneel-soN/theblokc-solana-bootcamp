import * as Web3 from '@solana/web3.js'
import 'dotenv/config'
import base58 from 'bs58'
import * as token from '@solana/spl-token'

async function main() {
    const conn = new Web3.Connection(Web3.clusterApiUrl('testnet'))
    const b58dpk= base58.decode(process.env.spk || '')
    const signer = Web3.Keypair.fromSecretKey(b58dpk)
    const mint = new Web3.PublicKey('4hppQPJtintVKMJToVLgjzHcDmivG3k9wJ7gLuzGkEnu')
    const owner = new Web3.PublicKey('9b1p8nUdXaKpZkAKNeDpgJM6QwJ5z2TEdfAftdns6ngK')
  const tokenAccount =  await token.createAccount(
        conn,
        signer,
        mint,
        owner,)
        console.log('token: ',tokenAccount.toBase58())
    
}


main()