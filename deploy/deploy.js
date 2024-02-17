//we are using hardhat deploy ethers here

const {networkConfig, developmentChains} = require("../helper-harhat-config");

async function deployFunc(hre){
    //hre is same as hardhat

    const {getNamedAccounts,deployments} = hre; //extracting from hre
    //extracting log and deploy function 
    const {deploy,log} = deployments
    const {deployer} = await getNamedAccounts(); //it is a way to get named acoounts
    const chainId = await network.config.chainId;
    console.log(chainId);

    // const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
    //we can also use chainID but using name here

    let Address;

    if(developmentChains.includes(network.name)){
        const ethUsdPriceFeed = await deployments.get("MockV3Aggregator");
        Address = ethUsdPriceFeed.address;
        console.log("deploying on local test network...");
    }
    else{
        Address = networkConfig[chainId]["ethUsdPriceFeed"];
        console.log("Deploying on testnet...");
    }


    const fundMe = await deploy("FundMe",{
        from:deployer,
        args:[Address],
        log:true,
    })
    console.log("deployed: " + fundMe.address);



    //if the contract does not exist we deploy a minimal version of contract for our local testing

   
}



module.exports.default = deployFunc
module.exports.tags = ["all","fundme"];

//mocking is used when we need testnet but we have to use local dev to make dev easy because testnet is slow 
//so mocking is used for unit testing

//when going for hardhat network or localhost we want to use a mock
