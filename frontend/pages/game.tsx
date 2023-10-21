import Image from 'next/image'
import img1 from './scroll.png'
import img2 from './bg.jpeg'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { createClient } from '@supabase/supabase-js';
import { buildPoseidonOpt as buildPoseidon } from 'circomlibjs';
import { split, join } from 'shamir';
import { useRouter } from 'next/router'; 
import ball from './animation.gif';
import { randomBytes } from 'crypto';
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
import { NexaSenderAddress, NexaReceiverAddress } from "../../hardhat/contractAddress";

export default function Home() {

  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();
  const [contract, setContract] = useState<Contract>();
  
  const supabase = createClient('https://wpqqgvyufhwnzeasirdi.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndwcXFndnl1Zmh3bnplYXNpcmRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc4MDk4NTAsImV4cCI6MjAxMzM4NTg1MH0.6KVZFaRHWCMns3do6qmHXOh0Tb8f6RpS-Z2oBBdmjeI');
  
  useEffect(() => {
    if (!isConnected) {
        window.alert("Not connected")
    } else {
        const contract = new ethers.Contract(NexaSenderAddress, NexaSender, signer as Signer);
        setContract(contract);
    }
  },[]);

  const testSupabaseConnection = async () => {
    const obj = {
      "addresses": [
        "5566",
        "9988"
      ],
      "chainIds": [
        "2",
        "5"
      ],
      "tokenContract": "1234",
      "tokenId": "2"
    }

    const poseidon = await buildPoseidon();
    const hash = poseidon.F.toString(poseidon([
      obj["tokenContract"],
      obj["tokenId"],
      obj["addresses"][0],
      obj["chainIds"][0],
      obj["addresses"][1],
      obj["chainIds"][1]
    ]));

    const uri = "https://ipfs.io/ipfs/bafybeibc5sgo2plmjkq2tzmhrn54bk3crhnc23zd2msg4ea7a4pxrkgfna/3350";
    const utf8Encoder = new TextEncoder();
    const secretBytes = utf8Encoder.encode(uri);
    const parts = split(randomBytes, 2, 2, secretBytes);

    const tx1 = await contract?.connect(signer as Signer).transmit(
      2,
      2,
      NexaReceiverAddress,
      parts[1].toString(),
      { value: ethers.utils.parseEther("0.1")}
    )
    await tx1.wait();

    const tx2 = await contract?.connect(signer as Signer).transmit(
      2,
      5,
      NexaReceiverAddress,
      parts[2].toString(),
      { value: ethers.utils.parseEther("0.01")}
    )
    await tx2.wait();

    const { data, error } = await supabase.from('nexalink')
    .insert([{ hash, obj, completed: false },
     ])
    if (error) {
      console.error("Error connecting to Supabase:", error);
    } else {
      console.log("Supabase connection successful");
    }

    window.alert(`Created game with hash ${hash}`);
    console.log(hash);

    handleButtonClick();

  };
  
  const [showGif, setShowGif] = useState(false);
  const router = useRouter();
  const handleButtonClick = () => {
    setShowGif(true);
    setTimeout(() => {
      router.push('/');
    }, 2000); 
  };

  return (
    <div 
      style={{
      backgroundImage: `url(${img2.src})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      }}
    >
      <div >
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
        <div>
    <center>
    <h1 className="absolute pt-40 left-1/4 right-1/4 z-1 text-3xl font-bold font-serif text-black">Conceal your NFT, master the game, unveil your triumph</h1>
    </center>
    <Image
        src={img1}
        alt="Picture of the author"
        height="650"
        width="750"
        className="-z-20 full pt-16" // just an example
    />  
        {/* <Image
            src={img2}
            alt="Picture of the author"
            layout="fill" // required
            objectFit="cover" // change to suit your needs
            className="fixed inset-0 -z-10  " // just an example
        /> */}
            {/* <input type="text" id="large-input" className="w-1/2 block mt-10 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Answer goes here'/> */}
        </div>
        {showGif && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black z-50">
          <Image
            src={ball}
            alt="Loading GIF"
            width={600}
            height={600}
          />
        </div>
      )}
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-brown dark:border-gray-700">
            <a href="#" >
                <Image className="rounded-t-lg bg-fill bg-black" src="https://ipfs.io/ipfs/QmNf1UsmdGaMbpatQ6toXSkzDpizaGmC9zfunCyoz1enD5/penguin/3350.png" alt="" height="250" width="400" />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Pudgy Penguin #3350</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">A collection 8888 Cute Chubby Pudgy Penquins sliding around on the freezing ETH blockchain.</p>
                <button  
                  className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-light-brown rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-light-brown dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
                  onClick={testSupabaseConnection}>
                    Play with this NFT
                </button>
            </div>
        </div>
        

        </center>
        <br/>
      </div>
  </div>
  )
}
