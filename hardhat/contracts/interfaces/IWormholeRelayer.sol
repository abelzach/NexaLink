// SPDX-License-Identifier: Apache 2
pragma solidity ^0.8.19;

interface IWormholeRelayer {
    function sendPayloadToEvm(
        uint16 targetChain,     
        address targetAddress,  
        bytes memory payload,   
        uint256 receiverValue,  
        uint256 gasLimit        
    ) external payable returns (
        uint64 sequence
    );

    function quoteEVMDeliveryPrice(
        uint16 targetChain,
        uint256 receiverValue,
        uint256 gasLimit
    ) external view returns (
        uint256 nativePriceQuote, 
        uint256 targetChainRefundPerGasUnused
    );

}