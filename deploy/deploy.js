//we are using hardhat deploy ethers here

async function deployFunc(hre){
    //hre is same as hardhat

    const {getNamedAccounts,deployments} = hre; //extracting from hre
    //extracting log and deploy function 
    const {deploy,log} = deployments
    const {deployer} = await getNamedAccounts(); //it is a way to get named acoounts
    const chainId = await network.config.chainId;

    console.log(chainId);
}

module.exports.default = deployFunc


//mocking is used when we need testnet but we have to use local dev to make dev easy because testnet is slow 
//so mocking is used for unit testing

//when going for hardhat network or localhost we want to use a mock
