import Image from 'next/image'
import img1 from './scroll.png'
import img2 from './bg.jpeg'
import clock from './clock.png'
import { ConnectButton } from '@rainbow-me/rainbowkit';
export default function Home() {
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
        <a href="#" className="block py-2 pl-3 pr-4 text-gray-800 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
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

        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-brown dark:border-gray-700">
            <a href="#" >
                <Image className="rounded-t-lg bg-fill bg-black" src={clock} alt="" />
            </a>
            <div className="p-5">
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                <button  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-light-brown rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-light-brown dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Hide this NFT
                </button>
            </div>
        </div>
        

        </center>
        <br/>
      </div>
  </div>
  )
}
