import React, { useState } from 'react';
import { ethers } from 'ethers';
import { PinataSDK } from 'pinata-web3';
import './App.css';

const contractABI = [
  "function signMessage() public",
  "function getSignCount(address signer) public view returns (uint256)"
];

const contractAddress = "0xEAbBA2c7C2C1Cc6c164a1790200102C4a85e4C87";

let j = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxNDE5MDVmYi1kZTMzLTQ3OTEtYmIyYi05MjY5MzQ3MTM1ZTgiLCJlbWFpbCI6InNocmF2eWEyOW11bnVnYWxhQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI3N2NjYWNlNTY0N2ZhZGQwYWQ1ZSIsInNjb3BlZEtleVNlY3JldCI6Ijc1OTA0YjM1ZWI1N2JmNTk1NTlhNGZkZjg1MDNlMTcxZmFkZGI3ZTAwMDVkODBiY2EyODg1OWNhMWI0N2VjNjEiLCJleHAiOjE3NjMwNTgxODl9.2PGryHJxuv0w25gBUhSdP0ltHyJtpkaDuya-OhqIBDU";
let k = "sapphire-immediate-dolphin-154.mypinata.cloud";

const pinata = new PinataSDK({
  pinataJwt: j,
  pinataGateway: k,
});

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [cid, setCid] = useState('');

  async function sign() { 
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    try {
      const tx = await contract.signMessage();
      console.log("Transaction sent. Waiting for confirmation...");
      await tx.wait();
      console.log("Message signed successfully!");
    } catch (error) {
      console.error("Error signing the message:", error);
    }
  }

  function connectWallet() {
    if (window.ethereum) {
      console.log('Ethereum wallet detected!');
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          console.log('Wallet accounts:', accounts);
        })
        .catch(error => {
          console.error('Error accessing wallet:', error);
        });
    } else {
      console.log('No Ethereum wallet detected.');
    }
  }

  async function uploadFile() {
    if (!selectedFile) {
      console.log('No file selected');
      return;
    }
    try {
      const file_t = new File([selectedFile], selectedFile.name, { type: selectedFile.type });
      await sign();
      const upload = await pinata.upload.file(file_t);
      console.log('File uploaded with CID:', upload);
      setCid(upload);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  async function retrieveFile() {
    if (!cid) {
      console.log('No CID provided');
      return;
    }
    try {
      await sign();
      const data = await pinata.gateways.get(cid);
      console.log('Retrieved data:', data);
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  }

  return (
    <div className="container">
      <h1>BLOCKCHAIN DA3</h1>
      
      <button onClick={connectWallet}>Connect Wallet</button>
      
      <div style={{ marginTop: '20px' }}>
        <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
        <button onClick={uploadFile} disabled={!selectedFile}>
          Upload File
        </button>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Enter CID"
          value={cid}
          onChange={(e) => setCid(e.target.value)}
        />
        <button onClick={retrieveFile} disabled={!cid}>
          Retrieve File
        </button>
      </div>
    </div>
  );
}

export default App;
