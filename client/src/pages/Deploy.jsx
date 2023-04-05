import React, { useEffect, useState } from "react";
import Stock from "../abis/Stock.json";
import web3 from "../connections";
import axios from "axios";
import Whitelist from "../abis/Whitelist.json";
import DeployStock from "../components/deploy/DeployStock";
import DeployTrader from "../components/deploy/DeployTrader";

const Deploy = () => {
   const [mode, setMode] = useState("stock");
   console.log('mode: ', mode);

   const [accounts, setAccounts] = useState([]);
   const [deployParams, setDeployParams] = useState({
      companyName: "",
      amount: 0,
      initialPrice: 0,
   });
   const handleChange = (e) => {
      setDeployParams({ ...deployParams, [e.target.name]: e.target.value });
   };

   const whitelistContract = new web3.eth.Contract(Whitelist.abi);

   const [message, setMessage] = useState("");

   const checkStock = () => {
      whitelistContract
         .deploy({
            data: Whitelist.bytecode,
         })
         .send();
   };

   const deployStock = async () => {
      if (
         !deployParams.companyName ||
         deployParams.amount < 0 ||
         deployParams.initialPrice < 0
      ) {
         alert("Enter all the parameters");
         return;
      }
      const mainAccount = accounts[accounts.length - 1];
      const ABI = Stock.abi;
      const bytecode = Stock.bytecode;
      const contract = new web3.eth.Contract(ABI);
      const contractDeployed = await contract
         .deploy({
            data: bytecode,
            arguments: [
               deployParams.companyName,
               deployParams.amount,
               deployParams.initialPrice,
            ],
         })
         .send({ from: mainAccount, gas: 1500000 })
         .on("receipt", (receipt) => {
            console.log("contract Address: ", receipt.contractAddress);
            setMessage("Contract Deplpyed at " + receipt.contractAddress);

            //   setDeployedContracts([
            //      ...deployedContracts,
            //      receipt.contractAddress,
            //   ]);
         });
   };

   const getAccounts = async () => {
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
   };

   useEffect(() => {
      getAccounts();
   }, []);

   return (
      <div className="">
         <div className="flex items-center justify-center space-x-5 p-4">
            <button onClick={() => setMode('stock')} className={`px-3 py-2 text-lg rounded-lg ${mode === 'stock' ? 'bg-primary text-white' : 'text-primary bg-white border-2 border-primary'}`} >Stock</button>
            <button onClick={() => setMode('trader')} className={`px-3 py-2 text-lg rounded-lg ${mode === 'trader' ? 'bg-primary text-white' : 'text-primary bg-white border-2 border-primary'}`} >Trader</button>
         </div>
            {mode === "stock" ? <DeployStock /> : mode === 'trader' && <DeployTrader />}
      </div>
   );
};

export default Deploy;
