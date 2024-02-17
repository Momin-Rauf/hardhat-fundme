const { deployments, ethers, getNamedAccounts } = require("hardhat");
const { assert } = require("chai");

describe("FundMe", () => {
    describe("constructor", () => {
        let FundMe;
        let deployer;
        let mockV3Agg;

        beforeEach(async () => {
            deployer = (await getNamedAccounts()).deployer;
            await deployments.fixture(["all"]);
            FundMe = await ethers.getContractAt("FundMe",deployer);
            mockV3Agg = await ethers.getContractAt("MockV3Aggregator",deployer);
        });

        describe("constructor", async () => {
            it("sets the aggregator address", async () => {
                const response = await FundMe.priceFeedValue;
                // console.log(response.toString()); // Convert BigNumber to string for logging
                assert.equal(response, mockV3Agg.address);
            });
        });
    });
});
