import React, { useState } from "react";
import { useSelector } from "react-redux";

const DeployTrader = () => {

   const address = useSelector(store => store.walletAddress);
   console.log('address: ', address);

   const [deployParams, setDeployParams] = useState({
      companyName: "",
      amount: 0,
      initialPrice: 0,
   });
   const handleChange = (e) => {
      setDeployParams({ ...deployParams, [e.target.name]: e.target.value });
   };
   
   return (
      <div className="flex flex-col mx-auto space-y-4 py-3 p-3 max-w-2xl">
         <h1 className="text-4xl text-center">Whitelist Trader/ Create Trader Contract</h1>

         <p>
            Selected Wallet Address: 
            {address}
         </p>
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
            // onClick={}
            className="text-white bg-blue-600 p-2 rounded-lg"
         >
            Deploy
         </button>
      </div>
   )
};

export default DeployTrader;
