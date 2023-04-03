import { useEffect, useState } from "react";
import web3 from "../connections";
import Stock from "../abis/Stock.json";

const Stocks = () => {
   const [accounts, setAccounts] = useState([]);
   const [deployedContracts, setDeployedContracts] = useState([]);
   useEffect(() => {
      getAccounts();
   }, []);
   const [result, setResult] = useState(0);

   const getAccounts = async () => {
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      console.log(accounts);
   };

   const deployStock = async () => {
      const mainAccount = accounts[accounts.length - 1];
      const ABI = Stock.abi;
      const bytecode = Stock.bytecode;
      const contract = new web3.eth.Contract(ABI);
      const contractDeployed = await contract
         .deploy({ data: bytecode })
         .send({ from: mainAccount, gas: 1000000 })
         .on("receipt", (receipt) => {
            console.log("contract Address: ", receipt.contractAddress);
            setDeployedContracts([
               ...deployedContracts,
               receipt.contractAddress,
            ]);
         });
   };

   const getPrice = async (address) => {
      const StockContract = new web3.eth.Contract(Stock.abi, address);
      StockContract.methods
         .currentPrice()
         .call()
         .then((res) => {
            console.log(res);
            setResult(web3.utils.toWei(res, "ether"));
         });
   };
   const buyOrder = async (address) => {
      const StockContract = new web3.eth.Contract(Stock.abi, address);
      const price = StockContract.methods
         .currentPrice()
         .call()
         .then((res) => {
            return setResult(web3.utils.toWei(res, "ether"));
         });
      StockContract.methods
         .buyOrder()
         .send({
            value: 1000000000000000000,
            from: accounts[0],
            gas: 1000000,
         })
         .then((res) => setResult("Sent Successfully"));
   };
   const sellOrder = async (address) => {
      const StockContract = new web3.eth.Contract(Stock.abi, address);
      StockContract.methods
         .sellOrder()
         .send({from: accounts[0]})
         .then((res) => setResult("Sold successfuly"));
   };

   return (
      <div>
         {/* {accounts.map((account, index) => {
            return <h5 key={index}>{account}</h5>;
         })} */}
         <button className="px-2" onClick={() => deployStock()}>
            Deploy
         </button>
         <h1>{result}</h1>
         <br />
         <br />
         <br />
         {deployedContracts.map((contractAddress, index) => {
            return (
               <div className="flex bg-blue-300 text-blue-300">
                  <h5 key={index}>{contractAddress}</h5>
                  <button
                     className="px-2"
                     onClick={() => getPrice(contractAddress)}
                  >
                     {" "}
                     Check Address{" "}
                  </button>
                  <button
                     className="px-2"
                     onClick={() => buyOrder(contractAddress)}
                  >
                     {" "}
                     buyOrder{" "}
                  </button>
                  <button
                     className="px-2"
                     onClick={() => sellOrder(contractAddress)}
                  >
                     {" "}
                     sellOrder{" "}
                  </button>
               </div>
            );
         })}
      </div>
   );
};

export default Stocks;
