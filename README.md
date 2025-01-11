
# Blockchain-Enhanced Decentralized Medical Record Management System

A blockchain-based decentralized application (dApp) for secure and immutable healthcare data management. This system leverages Ethereum blockchain and InterPlanetary File System (IPFS) to provide a robust framework for storing, authenticating, and retrieving medical records.

## Features

- **Secure Wallet-Based Authentication**: User authentication through Ethereum wallets using `ethers.js`.
- **On-Chain Data Verification**: Smart contract-enabled message signing and traceability of interactions.
- **Decentralized Storage**: Off-chain medical record storage using IPFS and retrieval via content identifiers (CIDs).
- **Privacy-Preserving Design**: Combines blockchain immutability with scalable, decentralized file storage.
- **Auditable Access Control**: Transparent logging of all access and modification attempts.

## Technology Stack

- **Frontend**: React.js
- **Backend**: Ethereum blockchain, Smart Contracts (Solidity), IPFS (Pinata)
- **Libraries**: `ethers.js`, `web3.js`
- **Other Tools**: Pinata SDK for IPFS integration

## Installation and Setup

### Prerequisites

- Node.js and npm installed
- MetaMask browser extension for Ethereum wallet connection
- Pinata account for IPFS integration

### Steps

1. Clone the repository:

2. Install dependencies:

3. Configure environment variables:
   Create a `.env` file with the following content:
   ```env
   REACT_APP_INFURA_PROJECT_ID=your-infura-project-id
   REACT_APP_PINATA_API_KEY=your-pinata-api-key
   REACT_APP_PINATA_SECRET_API_KEY=your-pinata-secret-api-key
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Deploy the smart contract:
   Use tools like Remix or Hardhat to deploy the Solidity smart contract on an Ethereum testnet (e.g., Goerli or Sepolia).

6. Update the contract address:
   Update the deployed contract address in the frontend code.

## Usage

1. Connect your Ethereum wallet using MetaMask.
2. Upload medical records to IPFS. A unique CID will be generated and signed on the blockchain.
3. Retrieve medical records by entering the CID. Access attempts are logged via smart contracts.

## File Structure

```plaintext
├── public/
│   ├── index.html
│   ├── manifest.json
│   ├── favicon.ico
│   └── ...
├── src/
│   ├── App.js          # Main application logic
│   ├── App.css         # Styling
│   ├── index.js        # Entry point
│   ├── ...             # Other components and utilities
├── .env                # Environment variables
├── package.json        # Project metadata and dependencies
├── README.md           # Project documentation
└── ...
```

## Future Scope

- Integration of advanced cryptographic techniques like Zero-Knowledge Proofs for enhanced privacy.
- Implementation of decentralized identity (DID) protocols for improved access control.
- Multi-chain interoperability to support diverse blockchain networks.
