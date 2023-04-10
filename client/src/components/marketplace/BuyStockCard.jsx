import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import web3 from "../../connections";
import Stock from "../../abis/Stock.json";
import Whitelist from "../../abis/Whitelist.json";
import Trader from '../../abis/Trader.json'

const BuyStockCard = ({ traderAddress, name }) => {
   const whitelistAddress = useSelector((store) => store.whitelistAddress);
   const walletAddress = useSelector(store => store.walletAddress);
   const [stockInfo, setStockInfo] = useState({
      name: name,
      price: 0,
      unsold: 0,
      amountInPublic: 0,
      address: "",
   });
   // console.log("stockInfo: ", stockInfo);
   //COde to initially fetch the address
   const getStockAddress = async () => {
      if (!whitelistAddress) {
         console.log("No Whitelist address in the redux state");
         return;
      }
      const whitelistContract = new web3.eth.Contract(
         Whitelist.abi,
         whitelistAddress
      );
      const res = await whitelistContract.methods.getStockAddress(name).call();
      setStockInfo({ ...stockInfo, address: res });
   };
   //Code to fetch other details form stock address
   const fetchDetails = async () => {
      const contract = new web3.eth.Contract(Stock.abi, stockInfo.address);
      const unsold = await contract.methods.unsold_amount().call();
      const price = await contract.methods.currentPrice().call();
      const amountInPublic = await contract.methods.amountInPublic().call();
      setStockInfo({
         ...stockInfo,
         price: price,
         unsold: unsold,
         amountInPublic: amountInPublic,
      });
      // console.log("Fetched Details: ", res);
   };
   useEffect(() => {
      getStockAddress();
   }, [whitelistAddress]);
   useEffect(() => {
      const fetchLoop = () =>
         setInterval(() => {
            fetchDetails();
         }, 1000);
      if (stockInfo.address) {
         fetchDetails();
         fetchLoop();
      }
      return () => {
         clearInterval(fetchLoop);
      };
   }, [stockInfo.address]);

   //function to buy a stock

   const verifyTrader = async () => {
      try{
         const whitelistContract = new web3.eth.Contract(
            Whitelist.abi,
         whitelistAddress
         );
         const res = await whitelistContract.methods
         .verifyTrader(traderAddress)
         .call()  
         return res;
      }catch(err){
         console.log(err);
         return false;
      }
   }

   const buyStock = async () => {
      if (!traderAddress) {
         alert("No trader contract address");
         return;
      }

      const isVerified = await verifyTrader();

      if(!isVerified){
         alert('Trader Account verification failed');
         return;
      }

      const traderContract = new web3.eth.Contract(Trader.abi, traderAddress);
      traderContract.methods.buyOrder(stockInfo.name, stockInfo.address).send({
         from: walletAddress,
         gas: 1500000,
         value: stockInfo.price * (10**18)
      })
      .then(res => {
         alert('Bought 1 stock of ' + name);
      })
      .catch(err => {
         if(err.message.includes('Owner Only')){
            alert('Transactions can only be made by the traders Wallet address');
         }else{
            console.log(err);
         }
      });
   };
   
   const sellStock = async () => {
      if (!traderAddress) {
         alert("No trader contract address");
         return;
      }

      const isVerified = await verifyTrader();

      if(!isVerified){
         alert('Trader Account verification failed');
         return;
      }

      const traderContract = new web3.eth.Contract(Trader.abi, traderAddress);
      traderContract.methods.sellOrder(stockInfo.address).send({
         from: walletAddress,
         gas: 1500000,
      })
      .then(res => {
         alert('Sold 1 stock of '+ name);
      })
      .catch(err => {
         if(err.message.includes('Owner Only')){
            alert('Transactions can only be made by the traders Wallet address');
         }else{
            alert('Not able to sell stock. Check if you have '+ name + ' stock in your inventory');
         }
      })
   };

   return (
      <div className="border-2 border-black rounded-lg p-3 bg-black bg-opacity-10 mb-6">
         <h3 className="text-3xl text-primary font-semibold my-3">
            {stockInfo.name}
         </h3>
         <p>
            <strong className="text-lg">Price: </strong>
            {stockInfo.price}
         </p>
         <p>
            <strong className="text-lg">Stock Address: </strong>
            {stockInfo.address}
         </p>
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

export default BuyStockCard;
