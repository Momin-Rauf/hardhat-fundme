// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.2;

/**
 * @title SimpleStorage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */

/*get funds from the user 
withdraw them 
set a min funding value */


//constants and immutable is used to bring the gas down

import "./PriceConverter.sol";

error notOwner();

contract FundMe {
    using PriceConverter for uint256;
    uint256 public constant minUSD = 50 * 1e18;
    mapping(address => uint256) addressToDonation;
    address[] funders;
    address public owner;

    constructor(){
        //constructor is called whenver the contract is deployed
        //same as other prog languages
        owner = msg.sender; //the person who deploys the contract will be the owner 
    }
    function fund() public payable{
        //we want to set m in usd amount
        //smart contracts can hold funds just like our wallets
        //use payable keyword to make it pay-able
        //msg.sender is the value added by the person making transaction or adding fund, can only be done in payable function
        //require keyword helps to maintain the condition
        require(msg.value.getConversionRate() > minUSD,"Did not send enough");  //did not send enough is revert message
        funders.push(msg.sender);
        addressToDonation[msg.sender] += msg.value;

    }

    

    function withdraw() public onlyOwner {


        //first loop through all funders and make their amount 0
        for(uint256 index=0;index < funders.length;index++){
            address funderAddress = funders[index];
            addressToDonation[funderAddress] = 0;
    }

    //now reset the array

    funders = new address[](0); // this is the way to reset the array

    //now we will actually withdraw the funds   (sending eth from contract
    //3 ways  transfer send and call
    //transfer is simplest 
//    payable(msg.sender).transfer(address(this).balance);  //this refers to contract (this contract stores the value) & msg.sender is the person calling the withdraw function
    //send helps to revert
    //call is most recommended 
    (bool callSuccess,) = payable(msg.sender).call{value: address(this).balance}("");
    require(callSuccess,"call failed");


    }
    modifier onlyOwner {

        //code below will be executed if i used onlyOwner modifier with my function
        // require(msg.sender == owner,"not the owner"); //checking is sender is owner
        //using custom errors makes code more gas efficient

         if(msg.sender != owner) {revert notOwner(); }   

        _; //rest of the code after above condition
    }
    //what happends if someone sends this contract ETH without calling fund
    /* Upper thing can happen if we use fallback and recieve =>(special functions) this works at low level interaction  */
    //recieve is triggered only when calldata portion is empty
    //fallback function is called when we put a value in calldata that does not specify a function, so it will then call falbback function which is created without function keyword

    receive() external payable {
        fund();
     }
    fallback() external payable {
        fund();
     }

    }