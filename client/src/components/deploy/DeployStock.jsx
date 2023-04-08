import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Stock from "../../abis/Stock.json";
import web3 from "../../connections";
import axios from "axios";
import Whitelist from "../../abis/Whitelist.json";
import { addStocks } from "../../actions";
import StockCard from "./StockCard";

const DeployStock = () => {
   const dispatch = useDispatch();
   const governmentAccount = useSelector((store) => store.governmentAccount);
   const stocks = useSelector((store) => store.stocks);
   const account = useSelector((store) => store.walletAddress);
   const whitelistAddress = useSelector((store) => store.whitelistAddress);

   const [deployParams, setDeployParams] = useState({
      companyName: "",
      amount: 0,
      initialPrice: 0,
   });
   const handleChange = (e) => {
      setDeployParams({ ...deployParams, [e.target.name]: e.target.value });
   };

   const deployStock = async () => {
      if (account.toLowerCase() != governmentAccount.toLowerCase()) {
         alert("Only Government Account can be used to deploy");
         return;
      }

      const isDeployed = await checkStock();
      if (isDeployed) {
         alert("already deployed");
         return;
      }
      if (
         !deployParams.companyName ||
         deployParams.amount < 0 ||
         deployParams.initialPrice < 0
      ) {
         alert("Enter all the parameters");
         return;
      }
      const companyName = deployParams.companyName;
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
            let stockAddress = receipt.contractAddress;
            console.log(receipt);
            const whitelistContract = new web3.eth.Contract(
               Whitelist.abi,
               whitelistAddress
            );
            whitelistContract.methods
               .addStock(companyName, stockAddress)
               .send({
                  from: account,
                  gas: 1000000,
               })
               .on("receipt", (res) => {
                  if (res.status) {
                     axios
                        .post("/stocks", {
                           name: companyName,
                        })
                        .then(() => {
                           alert("contract Deployed Successfully");
                        });
                     axios.get("/stocks").then((res) => {
                        dispatch(addStocks(res.data));
                     });
                  }
               })
               .catch((err) => {
                  alert(
                     "Could not deploy stock. Make sure you are have Government wallet address"
                  );
                  console.log(err);
               });
            // axios.get("/");

            //   setDeployedContracts([
            //      ...deployedContracts,
            //      receipt.contractAddress,
            //   ]);
         })
         .catch((err) => {
            alert(
               "Could not deploy stock. Make sure you are have Government wallet address"
            );
            console.log(err);
         });
   };

   const checkStock = async () => {
      const whitelistContract = new web3.eth.Contract(
         Whitelist.abi,
         whitelistAddress
      );
      console.log("whitelistContract: ", whitelistContract);

      const res = await whitelistContract.methods
         .checkStock(deployParams.companyName)
         .call()
         .catch((err) => {
            console.log(err)
         });
      console.log("res: ", res);
      return res;
   };

   return (
      <div className="flex flex-col mx-auto space-y-4 py-3 p-3 max-w-3xl">
         <h1 className="text-4xl text-center">Deploy a new Stock</h1>
         <label htmlFor="">Company Name</label>
         <input
            type="text"
            name="companyName"
            onChange={(e) => handleChange(e)}
            value={deployParams.companyName}
            placeholder="CompanyName"
            className="p-3 border-2 border-black  rounded-md"
         />
         <label htmlFor="">Amount</label>
         <input
            type="number"
            name="amount"
            value={deployParams.amount}
            onChange={(e) => handleChange(e)}
            placeholder="Amount"
            className="p-3 border-2 border-black  rounded-md"
         />
         <label htmlFor="">Initial Price</label>
         <input
            type="number"
            name="initialPrice"
            value={deployParams.initialPrice}
            onChange={(e) => handleChange(e)}
            placeholder="Initial Price"
            className="p-3 border-2 border-black  rounded-md"
         />
         <label htmlFor="" className="py-3"></label>
         <button
            type="submit"
            onClick={deployStock}
            className="text-white bg-blue-600 p-2 rounded-lg"
         >
            Deploy
         </button>
         <div className="py-5">
            {stocks
               .slice()
               .reverse()
               .map((stock) => {
                  return <StockCard key={stock.name} name={stock.name} />;
               })}
         </div>
      </div>
   );
};

export default DeployStock;
