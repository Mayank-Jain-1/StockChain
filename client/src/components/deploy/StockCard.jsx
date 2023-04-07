import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Stock from '../../abis/Stock.json'
import Whitelist from '../../abis/Whitelist.json'
import web3 from "../../connections";


const StockCard = ({name}) => {
   
   const whitelistAddress = useSelector(store=>store.whitelistAddress);

   const getStockAddress = async () => {
      if(!whitelistAddress){
         console.log('No Whitelist address in the redux state');
         return;
      }
      const whitelistContract = new web3.eth.Contract(
         Whitelist.abi,
         whitelistAddress
      );
      const res = await whitelistContract.methods.getStockAddress(name).call();
      console.log(`${name} is deployed at ${res}`)
      return res;
   }

   useEffect( () => {
      getStockAddress();
   },[whitelistAddress])

   return <div>{name}</div>;
};

export default StockCard;
