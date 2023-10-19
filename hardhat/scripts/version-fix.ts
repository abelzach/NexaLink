import fs from 'fs';

const solidityRegex = /pragma solidity \^\d+\.\d+\.\d+/

let content = fs.readFileSync("./contracts/Verifier.sol", { encoding: 'utf-8' });
let bumped = content.replace(solidityRegex, 'pragma solidity ^0.8.19');

fs.writeFileSync("./contracts/Verifier.sol", bumped);