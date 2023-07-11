import 'dotenv/config';
import * as Web3 from '@solana/web3.js';
import { sendAndConfirmTransaction } from '@solana/web3.js';

async function main() {
  const conn = new Web3.Connection('http://127.0.0.1:8899');
  const secretKeyBytes = [
    25, 232, 141, 58, 234, 47, 207, 8, 158, 210, 135, 145, 102, 132, 49, 22, 20, 111, 190, 151, 140, 122, 235, 9, 40, 200,
    210, 70, 35, 195, 96, 153, 223, 127, 155, 42, 175, 117, 45, 205, 75, 31, 12, 211, 86, 86, 45, 44, 186, 60, 255, 112,
    182, 99, 69, 36, 67, 101, 222, 7, 195, 146, 152, 62
  ];
  
  const signer = Web3.Keypair.fromSecretKey(new Uint8Array(secretKeyBytes));
  const transaction = new Web3.Transaction();
  const publicKey = new Web3.PublicKey('G3SmnM2G9vtnPcpR2U5v3fEvEjGk8v478iDJkEj1HGow');
  const instruction = new Web3.TransactionInstruction({
    keys: [
      {
        pubkey: publicKey,
        isSigner: true,
        isWritable: false,
      }
    ],
    data: Buffer.alloc(20),
    programId: new Web3.PublicKey("7VStgGGfWx5kbxKc3Pvx6zDXR267Aei5VXnmLmJis21j"), // contract of Solana
  });
  
  transaction.add(instruction);
  const signature = await sendAndConfirmTransaction(conn, transaction, [signer]);
  
  console.log('SIGNATURE', signature);
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
