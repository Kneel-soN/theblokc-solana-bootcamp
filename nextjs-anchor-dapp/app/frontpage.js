'use client'
import './App.css';
import Image from 'next/image';
import viper from './assets/viper.png'
import { useState} from 'react'
import {Buffer} from 'buffer';
import idl from './user_input.json'
import { Connection, PublicKey, clusterApiUrl  } from '@solana/web3.js';
import { Program, AnchorProvider, web3, } from '@project-serum/anchor';
import * as Web3 from '@solana/web3.js';
const {SystemProgram,Keypair} = web3;
window.Buffer = Buffer
const programID = new PublicKey('9WJTdSQ1F96fJFSGfpQMD6AEPqy14p5KcQuetDCRab91')
const opts = {
  preflightCommitment:"processed",
}


//const network = "http://127.0.0.1:8899";  // for localnet
//const network = clusterApiUrl("devnet") // for devnet
const network = clusterApiUrl("testnet") // for testnet


const new_account = Keypair.generate();
console.log(new_account)

function Frontpage() {
  
  const [userInput, setUserInput] = useState("");
  const [walletaddress, setWalletAddress] = useState("");
  const [Tx, setTx] = useState("");
  const [txSig, setTxSig] = useState('');
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [txDone, setTxDone] = useState(false);



  const getProvider = () => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new AnchorProvider(
      connection,
      window.solana,
      opts.preflightCommitment
    );
    return provider;
  };


  const connectWallet = async () => {
    if (!window.solana) {
      alert("Solana wallet not found. Please install Sollet or Phantom extension.");
      return;
    }

    // Connect the wallet using the provider
    try {
      await window.solana.connect();
      const provider = getProvider();
      const walletAddress = provider.wallet.publicKey.toString();
      setWalletAddress(walletAddress);
    } catch (err) {
      console.error("Error connecting wallet:", err);
    }
  };




async function input() {
  const dataAcc = new_account;
  console.log(dataAcc);
  const provider = getProvider();
  const program = new Program(idl, programID, provider);

  try {

    const txSignature = await program.rpc.initialize(userInput, {
      accounts: {
        newAccount: new_account.publicKey,
        signer: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [new_account],
    });

    const confirmation = await provider.connection.confirmTransaction(txSignature, 'confirmed');
    console.log('Transaction Confirmation:', confirmation);


    console.log('Transaction Signature:', txSignature);

    setTx(txSignature);
     setTxDone(true)
    const account = await program.account.newAccount.fetch(new_account.publicKey);
    console.log('Output:', account);
  } catch (err) {
    console.error("Transaction Error:", err);
  }
}



  
const findTxRes = async () => {
  try {
    const conn = new Web3.Connection('https://api.testnet.solana.com');
    const fetchedTransaction = await conn.getConfirmedTransaction(txSig);

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
      <p style={{ fontSize: '16px', color: 'green' }}>Address: {walletaddress}</p>
      <Image src={viper} alt="Logo" width={360}className="App-logo" />
        <button onClick={connectWallet}>Connect Wallet</button>


  <input value={userInput} onChange={(e) => setUserInput(e.target.value)} />
<button onClick={input}>Submit</button>
<p style={{ fontSize: '16px', color: 'green' }}>Signature: {Tx}</p>
{txDone && (
  <div>
          <p style={{ fontSize: 'smaller' }}>
            Transaction confirmed!{' '}
            <a
              href={`https://explorer.solana.com/tx/${Tx}?cluster=testnet`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Solana Explorer
            </a>
          </p>
          <p style={{ fontSize: '16px', color: 'yellow' }}>Please wait for a bit before trying to fetch</p>
          </div>
        )}  
<input
            type="text"
            value={txSig}
            onChange={(event) => setTxSig(event.target.value)}
            placeholder="Enter Transaction Signature"
          />
          <button onClick={findTxRes}>Fetch Transaction</button>
   
          {transactionDetails ? (
          <div>
            <h4>Transaction Details</h4>
            {transactionDetails.transaction.instructions.length >= 2 ? (
              <div>
                <p>
                  Your Input{' '}
                  <strong>{transactionDetails.transaction.instructions[0].data.slice(8).toString()}</strong> in this
                  transaction
                </p>
              </div>
            ) : (
              <p>No transaction data available.</p>
            )}
          </div>
        ) : (
          <p>No transaction data available.</p>
        )}
      </header>
    </div>
  );
}

export default Frontpage;
