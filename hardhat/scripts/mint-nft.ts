import { ethers } from "hardhat";
import { Contract } from "ethers";

const NFTAddress = "0xFaCD56154aC69F23FE9EDf441A5FcCC8ca310b9a";
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