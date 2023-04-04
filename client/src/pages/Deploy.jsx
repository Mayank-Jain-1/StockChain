import React, { useEffect, useState } from "react";
import Stock from "../abis/Stock.json";
import web3 from "../connections";
import axios from 'axios'
import Navbar from "../components/Navbar/Navbar";

const Deploy = () => {
   const [accounts, setAccounts] = useState([]);
   const [deployParams, setDeployParams] = useState({
      companyName: "",
      amount: 0,
      initialPrice: 0,
   });
   const handleChange = (e) => {
      setDeployParams({ ...deployParams, [e.target.name]: e.target.value });
   };

   const [message, setMessage] = useState('');

   const deployStock = async () => {
      if (
         (!deployParams.companyName || 
         deployParams.amount < 0 ||
         deployParams.initialPrice < 0)
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
            setMessage("Contract Deplpyed at "+ receipt.contractAddress);
            axios.post('/');



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
            <Navbar />
         <div className="bg-green-200 flex flex-col mx-auto space-y-4 py-3 p-3">
            <h1 className="text-4xl text-center">Deploy a new Stock</h1>

            <input
               type="text"
               name="companyName"
               onChange={(e) => handleChange(e)}
               value={deployParams.companyName}
               placeholder="CompanyName"
               className="p-3 rounded-md"
            />
            <input
               type="number"
               name="amount"
               value={deployParams.amount}
               onChange={(e) => handleChange(e)}
               placeholder="Amount"
               className="p-3 rounded-md"
            />
            <input
               type="number"
               name="initialPrice"
               value={deployParams.initialPrice}
               onChange={(e) => handleChange(e)}
               placeholder="Initial Price"
               className="p-3 rounded-md"
            />

         <button
          onClick={deployStock}
         className="text-white bg-blue-600 p-2 rounded-lg"
         >Deploy</button>
         <p>{message}</p>
         {accounts.map((address,index) => {
           return <p key={index}>{address}</p>
         })}
         </div>

      </div>
   );
};

export default Deploy;
