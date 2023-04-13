const Web3 = require("web3");
var provider = 'https://sepolia.infura.io/v3/a17c7f5eb2bb47228095fff73ea9bd24';
var web3Provider = new Web3.providers.HttpProvider(provider);
const web3 = new Web3(web3Provider);
// const rpcURL = "http://127.0.0.1:7545";
// const web3 = new Web3(rpcURL);
web3.eth.getBlockNumber().then((result) => {
   console.log("Latest Ethereum Block is ",result);
 });

module.exports = web3;

// const getWeb3 = async() => {
//    return new Promise (async(resolve, reject) => {
//     const web3 = new Web3(window.ethereum);
//     try{
//       await window.ethereum.request({method: eth_requestAccounts})
//       resolve(web3);
//     }catch(err){
//       reject(err);
//     }
//    })
// }

// module.exports = getWeb3