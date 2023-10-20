// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IWormholeReceiver.sol";

contract NexaReceiver is IWormholeReceiver, Ownable {
    mapping(uint256 => string) tokenPayloads;

    function receiveWormholeMessages(
        bytes memory payload,   
        bytes[] memory additionalVaas,
        bytes32 sourceAddress,  
        uint16 sourceChain,  
        bytes32 deliveryHash 
    ) external payable {
        (uint256 tokenId, string memory payload_) = abi.decode(payload, (uint256, string));
        tokenPayloads[tokenId] = payload_;
    }

    function getTokenPayload(uint256 tokenId) public view returns (string memory) {
        return tokenPayloads[tokenId];
    }
}