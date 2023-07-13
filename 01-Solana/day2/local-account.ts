import 'dotenv/config';
import * as Web3 from '@solana/web3.js';
import { sendAndConfirmTransaction } from '@solana/web3.js';

async function main() {
  const conn = new Web3.Connection('http://127.0.0.1:8899');

  const secretKeyBytes = [154,30,53,19,223,246,27,226,50,48,108,233,61,187,253,176,243,172,234,230,111,249,243,118,250,65,117,188,186,245,237,210,167,12,89,104,254,65,186,80,32,84,149,98,91,161,41,142,225,2,154,141,145,21,3,223,254,155,76,134,17,150,151,13];
  const signer = Web3.Keypair.fromSecretKey(new Uint8Array(secretKeyBytes));
  const transaction = new Web3.Transaction();
  const publicKey = new Web3.PublicKey('CF61RU1VAEJ4jHyf55KS4nNKAjM37TmMGQZkUN27c8Sp');

  const inputValue = 'Hello, Solana!'; // The input string

  const instruction = new Web3.TransactionInstruction({
    keys: [
      {
        pubkey: publicKey,
        isSigner: true,
        isWritable: false,
      }
    ],
    data: Buffer.from(inputValue, 'utf-8'), // Convert the input string to Buffer
    programId: new Web3.PublicKey("Esk5YV96XgHD8J96QjpEXrCHjNrQegBLFWv7Bzffnphu"), // contract of Solana
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
