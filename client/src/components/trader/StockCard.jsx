import React, { useEffect, useState } from "react";
import web3 from "../../connections";
import { useSelector } from "react-redux";
import Trader from "../../abis/Trader.json";
import Stock from "../../abis/Stock.json";

const StockCard = ({ name, amount, stockAddress, traderAddress }) => {
   console.log('amount: ', amount);
   const walletAddress = useSelector((store) => store.walletAddress);
   const [stockInfo, setStockInfo] = useState({
      name: name,
      stockAddress: stockAddress,
      price: 0,
   });

   const getPrice = async () => {
      const contract = new web3.eth.Contract(Stock.abi, stockInfo.stockAddress);
      const price = await contract.methods.currentPrice().call();
      setStockInfo({
         ...stockInfo,
         price: price,
      });
   };

   const buyStock = async () => {
      const traderContract = new web3.eth.Contract(Trader.abi, traderAddress);
      traderContract.methods
         .buyOrder(stockInfo.name, stockInfo.stockAddress)
         .send({
            from: walletAddress,
            gas: 1500000,
            value: stockInfo.price * 10 ** 18,
         })
         .then((res) => {
            alert("Bought 1 stock of " + name);
         })
         .catch((err) => {
            if (err.message.includes("Owner Only")) {
               alert(
                  "Transactions can only be made by the traders Wallet address"
               );
            } else {
               console.log(err);
            }
         });
   };

   const sellStock = async () => {
      const traderContract = new web3.eth.Contract(Trader.abi, traderAddress);
      traderContract.methods
         .sellOrder(stockInfo.stockAddress)
         .send({
            from: walletAddress,
            gas: 1500000,
         })
         .then((res) => {
            alert("Sold 1 stock of " + name);
         })
         .catch((err) => {
            if (err.message.includes("Owner Only")) {
               alert(
                  "Transactions can only be made by the traders Wallet address"
               );
            } else {
               alert(
                  "Not able to sell stock. Check if you have " +
                     name +
                     " stock in your inventory"
               );
            }
         });
   };

   useEffect(() => {
      const getPriceLoop = setInterval(() => {
         getPrice();
      }, 1000);
      return () => {
         clearInterval(getPriceLoop);
      };
   });

   return (
      <div className="border-2 border-black rounded-lg p-3 bg-black bg-opacity-10 mb-6">
         <div className="flex justify-between items-center">
            <div>
               <h3 className="text-3xl text-primary font-semibold my-3">
                  {stockInfo.name}
               </h3>
               <p>
                  <strong className="text-lg">Price: </strong>
                  {stockInfo.price}
               </p>
               <p>
                  <strong className="text-lg">Stock Address: </strong>
                  {stockInfo.stockAddress}
               </p>
            </div>
            <div>
               <h1 className="text-7xl mx-4">{amount}</h1>
            </div>
         </div>
         <div className="flex space-x-3 mt-3">
            <button
               onClick={() => {
                  buyStock();
               }}
               className="py-2 px-4 w-full rounded-lg border-white border-2 bg-blue-400 text-white"
            >
               Buy
            </button>
            <button
               onClick={() => {
                  sellStock();
               }}
               className="py-2 px-4 w-full rounded-lg border-white border-2 bg-red-400 text-white"
            >
               Sell
            </button>
         </div>
      </div>
   );
};

export default StockCard;
