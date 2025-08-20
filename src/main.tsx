import React from "react";
import ReactDOM from "react-dom/client";
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

import "./main.css"
import SignAndStore from "./SignAndStore";

const projectId = import.meta.env.VITE_PROJECT_ID;
if (!projectId) throw new Error("Project ID is undefined");


// const mainnet = {
//   chainId: 1,
//   name: 'Ethereum',
//   currency: 'ETH',
//   explorerUrl: 'https://etherscan.io',
//   rpcUrl: 'https://cloudflare-eth.com'
// }

const base = {
  chainId: 8453,
  name: 'BASE',
  currency: 'ETH',
  explorerUrl: 'https://basescan.org',
  rpcUrl: 'https://mainnet.base.org'
}

const metadata = {
  name: 'Forge404.io',
  description: 'FORGE 404 RO',
  url: 'https://www.forge404.io', // origin must match your domain & subdomain
  icons: ['https://www.forge404.io/images/favicon.png']
}


const ethersConfig = defaultConfig({

  metadata,

  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: 'https://mainnet.base.org', // used for the Coinbase SDK
  defaultChainId: 8453, // used for the Coinbase SDK
  auth: {
    email: false,

    showWallets: true,
    walletFeatures: false
  }
})

createWeb3Modal({
  ethersConfig,
  chains: [base],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
       <div className="main-container">
        <SignAndStore/> 
       
          <w3m-button />
        </div>
  </React.StrictMode>
);
