import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Stock from "../../abis/Stock.json";
import Whitelist from "../../abis/Whitelist.json";
import web3 from "../../connections";

const StockCard = ({ name }) => {
   const whitelistAddress = useSelector((store) => store.whitelistAddress);

   const [stockInfo, setStockInfo] = useState({
      name: name,
      price: 0,
      unsold: 0,
      amountInPublic: 0,
      address: "",
   });
   console.log('stockInfo: ', stockInfo);
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
      const unsold = await contract.methods
         .unsold_amount()
         .call()
      const price = await  contract.methods
         .currentPrice()
         .call()
      const amountInPublic = await contract.methods
         .amountInPublic()
         .call()
      setStockInfo({
         ...stockInfo,
         price: price,
         unsold: unsold,
         amountInPublic: amountInPublic
      })
      // console.log("Fetched Details: ", res);
   };
   useEffect(() => {
      getStockAddress();
   }, [whitelistAddress]);
   useEffect(() => {
      fetchDetails();
   }, [stockInfo.address])

   return (
      <div className="bg-opacity-80 rounded-xl bg-black p-3 my-5 justify-between">
         <div className="">
            <p className="text-lg font-semibold text-primary">{name}</p>
            <p className="text-white">{stockInfo.address}</p>
         </div>
         <div className="flex  space-x-10">
            <div>
               <p className="text-primary font-semibold">Unsold</p>
               <p className="text-white">{stockInfo.unsold}</p>
            </div>
            <div>
               <p className="text-primary font-semibold">Price</p>
               <p className="text-white">{stockInfo.price}</p>
            </div>
            <div>
               <p className="text-primary font-semibold">In Public</p>
               <p className="text-white">{stockInfo.amountInPublic}</p>
            </div>
         </div>
      </div>
   );
};

export default StockCard;
