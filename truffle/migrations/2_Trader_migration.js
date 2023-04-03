const traderContract = artifacts.require('Stock')

module.exports = function(deployer){
    deployer.deploy(traderContract);
}