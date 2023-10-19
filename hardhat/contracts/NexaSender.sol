// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IWormholeRelayer.sol";

contract NexaSender is Ownable {
    address public NFTAddress;
    IWormholeRelayer public wormholeRelayer;

    constructor (address _NFTAddress, address _wormholeRelayer) {
        NFTAddress = _NFTAddress;
        wormholeRelayer = IWormholeRelayer(_wormholeRelayer);
    }

    function send(
        uint256 tokenId,
        uint16 targetChain,
        address targetAddress,
        bytes memory payload,
        uint256 valueToSend,
        uint256 GAS_LIMIT
    ) external onlyOwner {
        IERC721(NFTAddress).safeTransferFrom(address(this), msg.sender, tokenId);
        
        (uint256 cost, ) = wormholeRelayer.quoteEVMDeliveryPrice(
            targetChain,
            valueToSend,
            GAS_LIMIT
        );

        wormholeRelayer.sendPayloadToEvm{value: cost}(
            targetChain,
            targetAddress,
            abi.encode(payload),
            valueToSend, 
            GAS_LIMIT
        );
    }   
}