import { ethers } from "hardhat";
import { Contract } from "ethers";

const NFTAddress = "";
const toAddress = "";
const uri = "";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(deployer.address);

  const SampleNFT = await ethers.getContractFactory("SampleNFT");
  const sampleNFT = SampleNFT.attach(NFTAddress);
  await sampleNFT.safeMint(toAddress, uri);

  console.log("Minted NFT");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
.then(() => {
  process.exit(0);
})
.catch((error) => {
  console.error(error);
  process.exitCode = 1;
});