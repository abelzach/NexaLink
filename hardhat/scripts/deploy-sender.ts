import { ethers } from "hardhat";
import { Contract } from "ethers";
import fs from 'fs';

const NFTAddress = "0xFaCD56154aC69F23FE9EDf441A5FcCC8ca310b9a";
const WormholeRelayer = "0xA3cF45939bD6260bcFe3D66bc73d60f19e49a8BB";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(deployer.address);

  const Verifier = await ethers.getContractFactory("Verifier");
  const verifier = await Verifier.deploy();
  await verifier.deployed();
  console.log("Verifier deployed to:", verifier.address);

  const NexaSender = await ethers.getContractFactory("NexaSender");
  const nexaSender = await NexaSender.deploy(
    NFTAddress,
    WormholeRelayer,
    verifier.address
  );
  await nexaSender.deployed();
  console.log("NexaSender deployed to:", nexaSender.address);

  return  {
    "Verifier": verifier,
    "NexaSender": nexaSender
  };
}

function saveFrontendFiles(contract: Contract, contractName: string, filePath: string) {
  fs.appendFileSync(
    filePath,
    `export const ${contractName}Address = '${contract.address}';\n`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
.then(async (deployedData) => {
  const filePath = "./contractAddress.ts";
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  Object.keys(deployedData).forEach(function(key:string) {
    saveFrontendFiles((deployedData as any)[key] as Contract, key, filePath);
  });
  process.exit(0);
})
.catch((error) => {
  console.error(error);
  process.exitCode = 1;
});