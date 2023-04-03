const TraderContract = artifacts.require('Trader');
const StockContract = artifacts.require('Stock');

module.exports = async function(deployer){

    await deployer.deploy(TraderContract);
    const Traders = await TraderContract.deployed();
    
    await deployer.deploy(StockContract);
    const Stocks = await StockContract.deployed();
}