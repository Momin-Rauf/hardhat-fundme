// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.2;

/**
 * @title SimpleStorage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */

//This is library
/* Library is similar to contract but i can't have states and cannot send ether*/
//SafeMath is one of the most common library but it was used in versions before 0.8 it is no loner used
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";


library PriceConverter {
    
     function getPrice() internal view returns(uint256){
        // ABI and Address of datafeed contract are needed
        //0x694AA1769357215DE4FAC081bf1f309aDC325306
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
      (,int256 price ,,,) = priceFeed.latestRoundData();
        return uint256(price * 1e10);
      //eth in terms of usd

    }

    function getVersion() internal view returns (uint256){
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        return priceFeed.version();
    }

    function getConversionRate(uint256 ethAmount) internal view returns(uint256) {
        uint256 ethPrice = getPrice();
        uint256 ethAmountInUsd = (ethPrice * ethAmount) /1e18;
        return ethAmountInUsd;

    }
}
