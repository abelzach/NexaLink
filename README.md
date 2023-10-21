# NexaLink

## Description

NexaLink is an NFT game wherein players can compete to win NFTs or crypto rewards. It employs the concept of fragmenting NFT data into recombinable parts. A user can create a new game by contributing any NFT of their choice to the game, using the "Create Game" section. Within this interface, they can select an NFT from their inventory. After making their selection, they can initiate the process by clicking "Play with the NFT." At this point, the NFT's metadata undergoes a transformation via the Shamir's Secret Sharing scheme. This process fragments the metadata into distinct components, which are subsequently distributed across randomized addresses on various blockchain networks. We have currently implemented this using Fuji, Goerli and Mumbai testnetworks, with the help of the Wormhole bridge.
Following the fragmentation and distribution of the NFT's metadata, a unique Game ID and this serves as the key that enables other players to participate in the competition to win the NFT. Players who possess a Game ID can access the game interface and participate in the competition. Each new player must add a deposit to be eligible to play.
Upon successfully solving various puzzles presented within the game, players are granted access to the various contract addresses where the NFT is stored across multiple blockchain networks. This the secret value which can be used to gain ownership of the original NFT. A zero-knowledge proof (ZKP) is generated with this data, and the player can use the ZKP to prove possesssion of the secret, without publicly revealing the original value. For each unsuccessful attempt, the deposit of the player is lost and it goes to the game creator. The winner of the competition is presented with two distinct options for their reward, either receive their reward in the form of SUI NXC coins, providing a liquid and tradable value or the winner has the option to claim the NFT as their own using the ZKP, taking ownership of the unique digital asset.

## Implementation of SUI
We created a move smart contract to create our own custom fungible token called NXC where there is a trusted manager that has admin privileges. The trusted manager has the ability to mint NXC coins, Burn NXC coins and transfer NXC coins to recipient address. We are using SUI client CLI to interact with the contract using the TreasuryCap  and Package ID of the published package.

NXC is our custom fungible token that the smart contract manages. It adheres to the blockchain standards for fungible tokens, making it compatible with various blockchain ecosystems. Players within our application can earn NXC tokens as rewards for their in-game achievements.

### Published contract information: 

Package ID : 0x1b0db71ce1efb4bfbd9ef9427ce159c6d48e0c076ebd0ea9d2dd8f301dabba61
SUI Explorer : https://suiexplorer.com/object/0x1b0db71ce1efb4bfbd9ef9427ce159c6d48e0c076ebd0ea9d2dd8f301dabba61?network=devnet

Treasury Cap ID : 0x7d679eab8a1b2f12bf19378742319588782a9ff127fadaea9065e77c49f122df
SUI Explorer: https://suiexplorer.com/object/0x7d679eab8a1b2f12bf19378742319588782a9ff127fadaea9065e77c49f122df?network=devnet

Coin Metadata : 0x314eb4760813761a4e4d3993fff06ab3874c8b2e0a366974b3067b65a900b07e
SUI Explorer: https://suiexplorer.com/object/0x314eb4760813761a4e4d3993fff06ab3874c8b2e0a366974b3067b65a900b07e?network=devnet

NexaSender: 0x8e1cABd107Bd9E8CF8B4B7F1F6D66C894e41c4aF
Fuji Explorer: https://testnet.snowtrace.io/address/0x8e1cABd107Bd9E8CF8B4B7F1F6D66C894e41c4aF

Verifier: 0xE67c4EaEEbE580B3356E1f65Ac17664Bf5757a63
Fuji Explorer: https://testnet.snowtrace.io/address/0xE67c4EaEEbE580B3356E1f65Ac17664Bf5757a63

NexaReceiver: 0xFaCD56154aC69F23FE9EDf441A5FcCC8ca310b9a
Goerli explorer: https://goerli.etherscan.io/address/0xFaCD56154aC69F23FE9EDf441A5FcCC8ca310b9a

NexaReceiver: 0xFaCD56154aC69F23FE9EDf441A5FcCC8ca310b9a
Mumbai explorer: https://mumbai.polygonscan.com/address/0xFaCD56154aC69F23FE9EDf441A5FcCC8ca310b9a
