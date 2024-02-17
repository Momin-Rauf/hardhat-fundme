const networkConfig = {
    11155111 : {
        name: "sepolia",
        ethUsdPriceFeed : "0x694AA1769357215DE4FAC081bf1f309aDC325306"
    },
    // similarly for other testnets

}


const developmentChains = ["hardhat","localhost"]
const DECIMALS = 8;
const INITIAL_ANSWER = 200000000000;

module.exports = {
    networkConfig,
    developmentChains,
    INITIAL_ANSWER,
    DECIMALS,
}