
const {developmentChains, DECIMALS,INITIAL_ANSWER} = require("../helper-harhat-config");
async function deployFunc(hre){
    //hre is same as hardhat

    const {getNamedAccounts,deployments} = hre; //extracting from hre
    //extracting log and deploy function 
    const {deploy,log} = deployments
    const {deployer} = await getNamedAccounts(); //it is a way to get named acoounts
    // const chainId = await network.config.chainId;
    console.log(network.name);

    if(developmentChains.includes(network.name)){
        log("local network detected,delpoying mock")
        await deploy("MockV3Aggregator",{
            contract: "MockV3Aggregator",
            from:deployer,
            log:true,
            args: [DECIMALS,INITIAL_ANSWER],
        });
        console.log("mock delpoyed")
    }

}

module.exports.tags = ["all","mocks"];

module.exports = deployFunc;