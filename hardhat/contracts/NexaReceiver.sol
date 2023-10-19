// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IWormholeReceiver.sol";

contract NexaReceiver is Ownable, IWormholeReceiver {
    address public NFTAddress;

    constructor (address _NFTAddress) {
        NFTAddress = _NFTAddress;
    }

    function receiveWormholeMessages(
        bytes memory payload,   
        bytes[] memory additionalVaas,
        bytes32 sourceAddress,  
        uint16 sourceChain,  
        bytes32 deliveryHash 
    ) external payable {
        require(additionalVaas.length == 0, "NexaReceiver: additionalVaas not supported");
        require(sourceChain == 1, "NexaReceiver: sourceChain must be Ethereum");
        require(deliveryHash == bytes32(0), "NexaReceiver: deliveryHash not supported");

        (address to, uint256 tokenId) = abi.decode(payload, (address, uint256));
        IERC721(NFTAddress).safeTransferFrom(address(this), to, tokenId);
    }
}