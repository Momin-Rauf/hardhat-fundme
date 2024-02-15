require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */

require('./tasks/block-number');
const SEPOLIA_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;



module.exports = {
  defaultNetwork:"hardhat",
  networks: {
    sepolia: {
      url:SEPOLIA_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
      
    },  
    
    
  },
  namedAccounts: {
    deployer: {
        default: 0, // here this will by default take the first account as deployer
        1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
},
  solidity: "0.8.19",
};
