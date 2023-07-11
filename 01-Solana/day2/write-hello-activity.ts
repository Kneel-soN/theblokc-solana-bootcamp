import 'dotenv/config'
import * as Web3 from '@solana/web3.js'
import base58 from 'bs58'
import { sendAndConfirmTransaction } from '@solana/web3.js'
async function main() {
    const conn = new Web3.Connection('http://127.0.0.1:8899')
    const b58dpk= base58.decode(process.env.spk || '')
        const signer = Web3.Keypair.fromSecretKey(b58dpk)
    const transaction = new Web3.Transaction()
    const publicKey = new Web3.PublicKey('9b1p8nUdXaKpZkAKNeDpgJM6QwJ5z2TEdfAftdns6ngK')
    const instruction = new Web3.TransactionInstruction({
        keys: [
            {
                pubkey: publicKey,
                isSigner: true,
                isWritable: false,
            }
        ],
        data: Buffer.alloc(20),
        programId: new Web3.PublicKey("7VStgGGfWx5kbxKc3Pvx6zDXR267Aei5VXnmLmJis21j") // contract of solana
    })
    transaction.add(instruction)
    const signature = await sendAndConfirmTransaction(
        conn,
        transaction,
        [signer]
    )

    console.log('SIGNATURE', signature)
}

main()
    .then(() => process.exit(0))
    .catch(err => {
        console.error(err)
    })