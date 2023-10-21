import React from 'react';
import img from './scroll2.png'
import img2 from './background1.jpeg'
import Puzzle from './puzzle8.jsx'
import Puzzle16 from './puzzle16.jsx'
import { useEffect } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { createClient } from '@supabase/supabase-js'

export default function Home(this: any) {
  const [type,setType] = React.useState(16);
  const [gameWon, setGameWon] = React.useState(false);
  const [argument, setArgument] = React.useState(undefined);

  const supabase = createClient('https://wpqqgvyufhwnzeasirdi.supabase.co', 'process.env.apiKey');

  const executeShellScript = async () => {
    const serverUrl = 'http://localhost:3001';

    try {
      const response = await fetch(serverUrl + '/execute-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ argument }),
      });


      if (response.ok) {
        const data = await response.text();
        console.log(data);
        window.alert("Congratulations");
      } else {
        console.error('Server error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Request error:', error);
    }
  };

  function change() {
    if(type === 8)
      setType(16);
    else
      setType(8);
  }
  useEffect(() => {
    change();
  }, []);

  const handleInputChange = (event:any) => {
    setArgument(event.target.value);
  };
  const handleSubmit = () => {
    console.log('Argument:', argument);
    executeShellScript();
  };

  const handleGameWin = (isGameWon:any) => {
    setGameWon(isGameWon);
    const retrieveData = async () => {

      let { data: nexalink, error } = await supabase
      .from('nexalink')
      .select("*")
      .eq('hash', '15847051433598237719476043098840889144974129000552564953744631443791354750759')
      if(error) {
        console.error("Error connecting to Supabase:", error);
      }
      else {
        console.log("Data retrieved ", nexalink[0].obj);
        let hashobj = nexalink[0].obj
        hashobj.gameHash =  nexalink[0].hash
        const serverUrl = 'http://localhost:3001';
        try {
          const response = await fetch(serverUrl + `/generate-proof?inputs=${JSON.stringify(hashobj)}`);
          if (response.ok) {
            let data = JSON.parse(await response.text()).toString();
            console.log("Data :: ",data);
            window.alert(`ZK Proof generated: \n ${data}`);
          } else {
            console.error('Server error:', response.status, response.statusText);
          }
        } catch (error) {
          console.error('Request error:', error);
        }
      }
    }
    retrieveData();
    
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
        
   
            {/* <input type="text" id="large-input" className="w-1/2 block mt-10 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Answer goes here'/> */}
        </div>
        <div className='ml-20 pt-32 flex'>
      <div  className="z-10"
      style={{
      backgroundImage: `url(${img.src})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      width: '750px', // Set the width
      height: '750px'
      }}
    >
        <center>
        <h1 className=" text-3xl pt-20 pr-10 pl-10 font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-sky-100 from-sky-300">Mental Gymnastics: Dive into the Number Maze</span> </h1>
        <div className=' pt-4  '>
        {
           type == 8 ?
           <Puzzle onGameWin={handleGameWin}  />
           :
           <Puzzle16 onGameWin={handleGameWin} />
        }
        
        </div>
        </center>
        </div>
        <div className='flex flex-col'>
        <div className="pr-40 pt-10">
        <button onClick={change} className="relative px-5 py-2 font-medium text-white group">
        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-purple-500 group-hover:bg-purple-700 group-hover:skew-x-12"></span>
        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-purple-700 group-hover:bg-purple-500 group-hover:-skew-x-12"></span>
        <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-purple-600 -rotate-12"></span>
        <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-purple-400 -rotate-12"></span>
        {
          type === 8 ?
           <span className="relative">Too Easy for you?</span>
           :
           <span className="relative">How about now nerd?</span>
        }
        
        </button>
        </div>
        {
          gameWon?
          <div className=" pt-8">
            <input type="text" id="large-input" className="ml-36 pl-20 w-full block mt-10 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Enter SUI address' onChange={handleInputChange}/>
            <button onClick={handleSubmit} type="button" className="text-lg mt-6 ml-60 text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg px-8 py-3 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2">
              
              Submit
              </button >
            </div>
            :
            <></>
        }
        </div>
      </div>
  </div>
  )
}
