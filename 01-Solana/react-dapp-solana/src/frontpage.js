import { useState, useEffect } from 'react';
import * as Web3 from '@solana/web3.js';
import logo192 from './assets/logo192.png';
import { connectWallet, dc, getProvider } from './functions';
import './App.css';

function Frontpage() {
  const [walletAddress, setWalletAddress] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [signature, setSignature] = useState('');
  const [isTransactionConfirmed, setTransactionConfirmed] = useState(false);
  const [transactionSignature, setTransactionSignature] = useState('');
  const [transactionDetails, setTransactionDetails] = useState(null);

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
      const pid = new Web3.PublicKey('7hFRDBWLeJQ8pQJNA5DsJn3gCmbNVpJ16rmHfhF6TQL4');
      const seeds = [Uint8Array.from('my-seed')];
      const [pda, pdaNonce] = Web3.PublicKey.findProgramAddressSync(seeds, pid);

      const accountPublicKey = pda;

      const newSeeds = [Uint8Array.from('my-seed'), Uint8Array.from([pdaNonce])];
      const [newPda] = Web3.PublicKey.findProgramAddressSync(newSeeds, pid);

      const instruction = new Web3.TransactionInstruction({
        keys: [
          {
            pubkey: accountPublicKey,
            isSigner: false,
            isWritable: true,
          },
        ],
        data: [],
        programId: pid,
      });

      transaction.add(instruction);

      const userinputData = new TextEncoder().encode(inputValue);
      const storeInstruction = new Web3.TransactionInstruction({
        keys: [
          {
            pubkey: newPda,
            isSigner: false,
            isWritable: true,
          },
        ],
        data: userinputData,
        programId: pid,
      });

      transaction.add(storeInstruction);

      const provider = getProvider();
      const { blockhash } = await conn.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;

      transaction.feePayer = publicKey;

      const signedTransaction = await provider.signTransaction(transaction);
      const txSignature = await conn.sendRawTransaction(signedTransaction.serialize());
      await conn.confirmTransaction(txSignature);

      setSignature(txSignature);
      setTransactionConfirmed(true);
    } catch (error) {
      console.error('Error sending transaction:', error);
    }
  };

  const handleTransactionClick = async () => {
    try {
      const conn = new Web3.Connection('http://127.0.0.1:8899');
      const fetchedTransaction = await conn.getConfirmedTransaction(transactionSignature);

      if (fetchedTransaction) {
        setTransactionDetails(fetchedTransaction);
      } else {
        console.log('Transaction not found.');
      }
    } catch (error) {
      console.error('Error fetching transaction:', error);
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
            <p>No wallet detected.</p>
          </>
        )}
        <input type="text" value={inputValue} onChange={hic} />
        {inputValue ? (
          <p>Result: {inputValue}</p>
        ) : (
          <p>Please enter some input.</p>
        )}
        <button onClick={hrclick}>Submit to Network</button>
        {isTransactionConfirmed && (
          <p style={{ fontSize: 'smaller' }}>
            Transaction confirmed!{' '}
            <a
              href={`https://explorer.solana.com/tx/${signature}?cluster=custom&customUrl=http%3A%2F%2Flocalhost%3A8899`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Solana Explorer
            </a>
          </p>
        )}
        <div >
        <p>TX: {signature}</p>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <h3>Transaction Details</h3>
          <input
            type="text"
            value={transactionSignature}
            onChange={(event) => setTransactionSignature(event.target.value)}
            placeholder="Enter Transaction Signature"
          />
          <button onClick={handleTransactionClick}>Fetch Transaction</button>
      
          {transactionDetails ? (
  <div>
    <h4>Transaction Details</h4>
    {transactionDetails.transaction.instructions
      .filter((_, index) => index === 1)
      .map((instruction, index) => (
        <div key={index}>
          <p>You have Input: <strong>{instruction.data.toString()}</strong> in this transaction</p>
        </div>
      ))}
  </div>
) : (
  <p>No transaction data available.</p>
)}

        </div>
      </header>
    </div>
  );
}

export default Frontpage;
