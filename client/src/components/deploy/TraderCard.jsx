import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Trader from "../../abis/Trader.json";
import Whitelist from "../../abis/Whitelist.json";
import DeployTrader from "./DeployTrader";
import Web3 from "web3";

const TraderCard = ({ traderAddress }) => {

   const web3 = new Web3(window.ethereum);
   const whitelistAddress = useSelector((store) => store.whitelistAddress);

   const [traderInfo, setTraderInfo] = useState({
      name: "",
      contractAddress: traderAddress,
      walletAddress: "",
   });
   //COde to initially fetch the address


   const fetchTraderDetails = async () => {
      const traderContract = new web3.eth.Contract(
         Trader.abi,
         traderInfo.contractAddress
      );
      const name = await traderContract.methods
         .name()
         .call()
         .then((res) => {
            return res;
         });
      const walletAddress = await traderContract.methods
         .owner()
         .call()
         .then((res) => {
            return res;
         });
      setTraderInfo({
         ...traderInfo,
         name: name,
         walletAddress: walletAddress
      })
   };

   useEffect(() => {
      if (traderInfo.contractAddress) {
         fetchTraderDetails();
      }
   }, [traderInfo.contractAddress]);
   // useEffect(() => {
   //    if(traderInfo.walletAddress){
   //       fetchDetails();
   //    }
   // }, [traderInfo.walletAddress])

   return (
      <div className="bg-opacity-80 rounded-xl bg-black p-3 my-5 justify-between items-center flex justify between flex-wrap">
         <div className="">
            <p className="text-white">
               <span className="text-primary font-medium">Wallet Address </span>
               {traderInfo.walletAddress}
            </p>
            <p className="text-white">
               <span className="text-primary font-medium">
                  Contract Address{" "}
               </span>
               {traderInfo.contractAddress}
            </p>
         </div>
         <div className="flex  space-x-10">
            <div>
               <p className="text-lg font-semibold text-primary">
                  {traderInfo.name}
               </p>
            </div>
         </div>
      </div>
   );
};

export default TraderCard;
