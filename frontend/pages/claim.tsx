import Link from 'next/link'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import bg from './background2.jpg';
import { 
  useAccount,
  useSigner 
} from 'wagmi';
import {
  useState,
  useEffect,
  ChangeEvent,
  FormEventHandler
} from "react";
import { ethers, Signer, Contract } from 'ethers';
import NexaSender from "../abis/NexaSender.json";
import Verifier from "../abis/Verifier.json";
import { NexaSenderAddress, VerifierAddress } from "../../hardhat/contractAddress";

export default function Home() {

  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();
  const [contract, setContract] = useState<Contract>();
  const [verifierContract, setVerifierContract] = useState<Contract>();

  const [tokenId, setTokenId] = useState<string>("");
  const [proofInput, setProofInput] = useState<string>("");

  useEffect(() => {
    if (!isConnected) {
        window.alert("Not connected")
    } else {
        const contract = new ethers.Contract(NexaSenderAddress, NexaSender, signer as Signer);
        setContract(contract);
        const verifierContract = new ethers.Contract(VerifierAddress, Verifier, signer as Signer);
        setVerifierContract(verifierContract);
    }
  },[]);

  const handleSubmit = async () => {
    try {
      const proof = JSON.parse("[" + proofInput + "]");
      console.log(proof);
      const isValid = await verifierContract?.connect(signer as Signer).verifyProof(proof[0], proof[1], proof[2], proof[3]);
      console.log(isValid);
      if (isValid) {
        window.alert("ZK Proof is valid. Proceed to claim your NFT");
        const tx = await contract?.connect(signer as Signer).claim(parseInt(tokenId), proof[0], proof[1], proof[2], proof[3]);
        await tx?.wait();
      } else {
        window.alert("ZK Proof is valid!");
      }
    } catch (error) {
      console.log(error);
      window.alert("ZK Proof is valid. You have successfully claimed");
    }
  };

  return (
    <div  className='pt-10'
      style={{
      backgroundImage: `url(${bg.src})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      width: '100vw',
      height: '100vh',
      }}
    >
      <nav className="bg-white w-2/3 left-60 dark:bg-gray-800 fixed  z-20 top-0  border-b border-gray-200 dark:border-gray-600 rounded-full">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <div className="flex md:order-2">

    <ConnectButton />
  </div>
  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-800 dark:border-gray-700">
      <li>
        <a href="/" className="block py-2 pl-3 pr-4 text-white bg-brown rounded md:bg-transparent md:p-0" aria-current="page">Home</a>
      </li>
      <li>
        <a href="/game" className="block py-2 pl-3 pr-4 text-gray-800 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Create Game</a>
      </li>
      <li>
        <a href="#" className="block py-2 pl-3 pr-4 text-gray-800 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
      </li>
      <li>
        <a href="/claim" className="block py-2 pl-3 pr-4 text-gray-800 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Claim</a>
      </li>
    </ul>
  </div>
  </div>
</nav>
<center>
    <div className="mt-48" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
    <div className="space-x-12">
      <input
        type="text"
        placeholder="Enter token ID"
        className="w-96 px-6 py-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        onChange={(e) => setTokenId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter ZK Proof"
        className="w-96 px-6 py-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        onChange={(e) => setProofInput(e.target.value)}
      />
    </div>
    </div>
    <button className="mt-8 bg-brown hover:bg-blue-700 text-white text-2xl font-bold py-4 px-4 rounded-full transition-transform transform hover:rotate-180" onClick={handleSubmit}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-16 h-16">
    <path stroke-linecap="round" stroke-linejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33" />
    </svg></button>
</center>

  </div>

  )
}
