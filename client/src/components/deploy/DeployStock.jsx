import React, { useState } from "react";
import { useSelector } from "react-redux";
import Stock from "../../abis/Stock.json";
import web3 from "../../connections";
import axios from "axios";

const DeployStock = () => {
   const account = useSelector((store) => store.walletAddress);

   const [deployParams, setDeployParams] = useState({
      companyName: "",
      amount: 0,
      initialPrice: 0,
   });
   const handleChange = (e) => {
      setDeployParams({ ...deployParams, [e.target.name]: e.target.value });
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
         .send({ from: account, gas: 1500000 })
         .on("receipt", (receipt) => {
            console.log("contract Address: ", receipt.contractAddress);
            alert("Contract Deplpyed at " + receipt.contractAddress);
            // axios.get("/");

            //   setDeployedContracts([
            //      ...deployedContracts,
            //      receipt.contractAddress,
            //   ]);
         })
         .catch((err) => console.log(err));
   };

   return (
      <div className="flex flex-col mx-auto space-y-4 py-3 p-3 max-w-2xl">
         <h1 className="text-4xl text-center">Deploy a new Stock</h1>

         <input
            type="text"
            name="companyName"
            onChange={(e) => handleChange(e)}
            value={deployParams.companyName}
            placeholder="CompanyName"
            className="p-3 border-2 border-black  rounded-md"
         />
         <input
            type="number"
            name="amount"
            value={deployParams.amount}
            onChange={(e) => handleChange(e)}
            placeholder="Amount"
            className="p-3 border-2 border-black  rounded-md"
         />
         <input
            type="number"
            name="initialPrice"
            value={deployParams.initialPrice}
            onChange={(e) => handleChange(e)}
            placeholder="Initial Price"
            className="p-3 border-2 border-black  rounded-md"
         />

         <button
            onClick={deployStock}
            className="text-white bg-blue-600 p-2 rounded-lg"
         >
            Deploy
         </button>
      </div>
   );
};

export default DeployStock;
