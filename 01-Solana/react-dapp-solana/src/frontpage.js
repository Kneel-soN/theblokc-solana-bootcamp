import logo from './logo.svg';
import './App.css';
import logo192 from './assets/logo192.png';
import { connectWallet, dc , getProvider} from './functions';
import { useState } from 'react';
import * as Web3 from '@solana/web3.js';
import { sendAndConfirmTransaction } from '@solana/web3.js';
<script src="https://unpkg.com/@solana/web3.js@latest/lib/index.iife.min.js"></script>

function Frontpage() {
  const [walletAddress, setWalletAddress] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');

  const connect = async () => {
    try {
      const address = await connectWallet();
      setWalletAddress(address);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const dcbutton = async () => {
    const provider = getProvider();
    await dc(provider, walletAddress);
    setWalletAddress('');
  };

  const hic = (event) => {
    setInputValue(event.target.value);
  };

  const hrclick = async () => {
    try {
      const conn = new Web3.Connection('http://127.0.0.1:8899');
      const transaction = new Web3.Transaction();
      const publicKey = new Web3.PublicKey(walletAddress);

      const instruction = new Web3.TransactionInstruction({
        keys: [
          {
            pubkey: publicKey,
            isSigner: true,
            isWritable: false,
          },
        ],
        data: new TextEncoder().encode(inputValue),
        programId: new Web3.PublicKey('7cgYCe8kEGUizRzRNf2EK5y5fS7XQv1wXUxyBgLa1SG6'),
      });

      transaction.add(instruction);

      const provider = getProvider();
      const { blockhash } = await conn.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;

      transaction.feePayer = publicKey;

      const signedTransaction = await provider.signTransaction(transaction);
      const signature = await conn.sendRawTransaction(signedTransaction.serialize());
      await conn.confirmTransaction(signature);
      
      setResult(signature);
      console.log('Signature: ', signature)
    } catch (error) {
      console.error('Error sending transaction:', error);
   
    }
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo192} className="App-logo" alt="logo" />
        {walletAddress ? (
          <>
            <p>Wallet: {walletAddress}</p>
            <button onClick={dcbutton}>Disconnect</button>
          </>
        ) : (
          <>
            <button onClick={connect}>Connect</button>
            <p>No wallet Detected</p>
          </>
        )}
<input type="text" value={inputValue} onChange={hic} />
{inputValue ? (
  <p>Result: {inputValue}</p>
) : (
  <p>Please enter some input.</p>
)}
<button onClick={hrclick}>Submit to Network</button>


      </header>
    </div>
  );
}

export default Frontpage;
