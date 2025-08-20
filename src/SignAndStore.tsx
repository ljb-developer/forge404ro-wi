import * as React from "react";
import { useState, useEffect } from "react";

import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { BrowserProvider, Contract, formatUnits } from "ethers";
import { abi } from "../abi";
import './styles.css';

import { ethers } from "ethers";

import UserOptions from "./components/UserOptions";
import UserTokens from "./components/UserTokens";

// const abi2 = [
//   "function claim() view returns ()",
//   "function initializeBatch(address[] addresses) view returns ()",
//   "function isInSnapshot(address _address) view returns (bool)",
//   "function hasClaimed(address _address) view returns (bool)",
//   "function getClaims() view returns (address[])",
//   "function getSnapShot() view returns (address[])",
//   "function owner() view returns (address)",
//   "function snapshot(uint256) view returns (address)",
//   "event ClaimMade(address)",
//   "event ClaimRemoved(address)",
// ];¨

// Old one that worked in the MOCK Contract
const abi2 = [
  "function addNFTOptions(address user, uint256 value) nonpayable",
  "function addUserForged(address user, uint256 value) nonpayable",
  "function dissolve(uint256 tokenId) nonpayable returns (bool)",
  "function finalizePreviousCommitment() nonpayable returns (bool)",
  "function forge(uint256 tokenId) nonpayable returns (bool)",
  "function forgeAll() nonpayable returns (bool)",
  "function setHasCommitment(address user) nonpayable",
  "constructor() nonpayable",
  "function getNFTOptions(address user) view returns (uint256[])",
  "function getUserForged(address user) view returns (uint256[])",
  "function hasCommitment(address user) view returns (bool)"
]; 

// Old Mock Contract Address
// const contractAddress = "0xc43CF772D032df7f8b16D8A060A3D4Dd358fc0d7";

const contractAddress = "0x3A0cfCf1a82328932F3b1b8b452eD6D6D98e8319";

// Test contract address: 0x55F323bAcb8f37291EC628Ba6B7C0C3c2121D77e


import "./SignAndStore.css";



export function SignAndStore() {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [forged, setForged] = useState([]);
  const [options, setOptions] = useState([]);
  const [commitment, setCommitment] = useState(false);

  async function forgeToken(tokenId) {
    try {
      if (!isConnected) throw Error("User disconnected");

      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

      const ForgeContract = new Contract(contractAddress, abi, signer);
      const ForgeResult = await ForgeContract.forge(tokenId);

      console.log("Forged #:", ForgeResult);

    } catch (error) {
      if (error.reason !== undefined) {
        console.log("Revert reason:", error.reason);
        alert(error.reason + "!");
      } else {
        alert("Please connect your wallet first!");
      }
    }
  }


  async function forgeAll() {
    try {
      if (!isConnected) throw Error("User disconnected");

      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

      const ForgeContract = new Contract(contractAddress, abi, signer);
      const ForgeResult = await ForgeContract.forgeAll();
console.log("xxx");
    console.log("Forged all collected Options", ForgeResult);

    } catch (error) {
      if (error.reason !== undefined) {
        console.log("Revert reason:", error.reason);
        alert(error.reason + "!");
      } else {
        alert("Please connect your wallet first!");
      }
    }
  }


    async function dissolveToken(tokenId) {
    try {
      if (!isConnected) throw Error("User disconnected");

      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

      const ForgeContract = new Contract(contractAddress, abi, signer);
      const ForgeResult = await ForgeContract.dissolve(tokenId);

      console.log("Dissolved #:", ForgeResult);

    } catch (error) {
      if (error.reason !== undefined) {
        console.log("Revert reason:", error.reason);
        alert(error.reason + "!");
      } else {
        alert("Please connect your wallet first!");
      }
    }
  }


  async function finalizeCommitment() {
    try {
      if (!isConnected) throw Error("User disconnected");

      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();

      const ForgeContract = new Contract(contractAddress, abi, signer);
      const ForgeResult = await ForgeContract.finalizePreviousCommitment();

      setCommitment(false);

    console.log("Commitment finalized!")

    } catch (error) {
      if (error.reason !== undefined) {
        console.log("Revert reason:", error.reason);
        alert(error.reason + "!");
      } else {
        alert("Please connect your wallet first!");
      }
    }
  }


  const contractForge = (tokenId) => {
    
    console.log("Attempting to Forge Token #", tokenId);
    forgeToken(tokenId);

  };

  const contractForgeAll = () => {
    
    console.log("Attempting to Forge All Collected Options");
    forgeAll();

  };


  const contractDissolve = (tokenId) => {
    
    console.log("Attempting to Dissolve Token #", tokenId);
    dissolveToken(tokenId);

  };

  // async function claimTokens() {
  //   try {
  //     if (!isConnected) throw Error("User disconnected");

  //     const ethersProvider = new BrowserProvider(walletProvider);
  //     const signer = await ethersProvider.getSigner();

  //     const USDTContract = new Contract(contractAddress, abi, signer);
  //     const USDTResult = await USDTContract.claim();

  //     console.log("Result: ", USDTResult);
  //   } catch (error) {
  //     if (error.reason !== undefined) {
  //       console.log("Revert reason:", error.reason);
  //       alert(error.reason + "!");
  //     } else {
  //       alert("Please connect your wallet first!");
  //     }
  //   }
  // }

  async function forgedList() {
    try {
      if (!isConnected) throw Error("User disconnected");

      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();
     
      const ForgeContract = new Contract(contractAddress, abi, signer);
      
      const ForgedResult = await ForgeContract.getUserForged(signer);
      const OptionsResult = await ForgeContract.getNFTOptions(signer);
      const CommitmentResult = await ForgeContract.hasCommitment(signer);
      
  // console.log("Forged Result: ", ForgedResult);
  // console.log("Options Result: ", OptionsResult);
  // console.log("Commitment Result: ", CommitmentResult);


      // if (ForgeResult.includes(address)) {
      // }

        setForged(ForgedResult);
        setOptions(OptionsResult);
        setCommitment(CommitmentResult);
      
      
    } catch (error) {
     
    }
  }

  useEffect(() => {

    if (!isConnected) setForged([]);
    forgedList();

  }, [isConnected]); 
  
  

  return (
    <div className="container">
      <img src="/images/animated-logo.gif" id="dynamicImage" />

      <div>
        <div
          id="forging"
          style={{ visibility: "visible", marginBottom: "50px" }}
        >
          {/* <img
            src="images/forge_to_base.gif"
            style={{ borderRadius: "6px", width: "300px" }}
          /> */}
        </div>
      {/* Display only if options is not empty */}
        {address && options.length > 0 && (
          <UserOptions title="Revealed Options" forgedTokens={options} contractForge={contractForge} />
        )}
        
        {address && options.length > 0 && (
          <div style={{ marginBottom: "30px" }}>
            <button className="forge-button" onClick={contractForgeAll}>Forge All</button>    
          </div>
        )}

        {address && options.length < 1 && (
          <div style={{ marginBottom: "30px", display: "flex", justifyContent: "center" }}>
            <h2 className="forge-options">Revealed Options: 0</h2>    
          </div>
        )}       

        {address && commitment && (
          <div style={{ marginBottom: "60px" }}>
          <div style={{ marginBottom: "0px", paddingBottom: "0px" }}>
            <button className="forge-button" onClick={finalizeCommitment} style={{ marginBottom: "20px", width: "300px" }}>Reveal NFT Options</button>
                
          </div>
          <div style={{ fontSize: "10px", fontFamily: "arial, verdana", color: "#aaa" }}>Must be done within 8 min of token purchase to yield results</div>
          </div>
        )}  

        {address && <UserTokens title="Forged NFTs" forgedTokens={forged} userAddress={address} contractDissolve={contractDissolve} />}

 
      </div>
      <footer></footer>
    </div>
  );
}

export default SignAndStore;
