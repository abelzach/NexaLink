// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IWormholeRelayer.sol";

contract NexaSender is IERC721Receiver, Ownable {
    uint256 GAS_LIMIT = 200000;
    address public NFTAddress;
    address public targetAddress;
    IWormholeRelayer public wormholeRelayer;

    constructor (address _NFTAddress, address _wormholeRelayer) {
        NFTAddress = _NFTAddress;
        wormholeRelayer = IWormholeRelayer(_wormholeRelayer);
    }

    function setNFTAddress(address _NFTAddress) external onlyOwner {
        NFTAddress = _NFTAddress;
    }

    function setTargetAddress(address _targetAddress) external onlyOwner {
        targetAddress = _targetAddress;
    }

    function setWormholeRelayer(address _wormholeRelayer) external onlyOwner {
        wormholeRelayer = IWormholeRelayer(_wormholeRelayer);
    } 

    function transmit(
        uint256 tokenId,
        uint16 targetChain,
        bytes memory payload
    ) 
        external 
        payable  
    {
        require(targetAddress != address(0), "Target address not set");

        if (IERC721(NFTAddress).ownerOf(tokenId) != address(this)) {
            require(
                IERC721(NFTAddress).isApprovedForAll(
                    msg.sender, 
                    address(this)),
                    "Not approved to transfer NFT"
                );
            IERC721(NFTAddress).safeTransferFrom(msg.sender, address(this), tokenId);
        }
        
        (uint256 cost, ) = wormholeRelayer.quoteEVMDeliveryPrice(
            targetChain,
            0,
            GAS_LIMIT
        );

        require(msg.value >= cost, "Insufficient value provided");

        wormholeRelayer.sendPayloadToEvm{value: cost} (
            targetChain,
            targetAddress,
            abi.encode(payload),
            0, 
            GAS_LIMIT
        );
    }   

    function getQuote(
        uint16 targetChain,
        uint256 valueToSend,
        uint256 GAS_LIMIT_
    ) 
        external 
        view 
        returns (uint256)
    {
        (uint256 cost, ) = wormholeRelayer.quoteEVMDeliveryPrice(
            targetChain,
            valueToSend,
            GAS_LIMIT_
        );
        return cost;
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes memory
    ) public virtual override returns (bytes4) {
        return this.onERC721Received.selector;
    }
}