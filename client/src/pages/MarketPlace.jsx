import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BuyStockCard from "../components/marketplace/BuyStockCard";

//import "./App.css";
const MarketPlace = () => {
   const stocks = useSelector((store) => store.stocks);

   const [traderAddress, setTraderAddress] = useState("");

   const handleChange = (e) => {
      setTraderAddress(e.target.value);
   };

   return (
      <div className="flex flex-col items-center">
         <div className="max-w-3xl w-full space-y-4">
            <h1 className="text-4xl text-center my-5">
               Buy and sell stocks through Blockchaiin
            </h1>
            <label htmlFor="">Trader Contract Address</label>
            <input
               type="text"
               name="companyName"
               onChange={(e) => handleChange(e)}
               value={traderAddress}
               placeholder="0x00000000000000000000000000000000000"
               className="p-3 border-2 border-black  rounded-md w-full"
            />
            <div className="py-10">
               {stocks.map((stock, index) => {
                  return <BuyStockCard key={index} name={stock.name} traderAddress={traderAddress}/>;
               })}
            </div>
         </div>
      </div>
   );
};
export default MarketPlace;
