import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BuyStockCard from "../components/marketplace/BuyStockCard";
import Trader from "../abis/Trader.json";
import Web3 from "web3";

//import "./App.css";
const MarketPlace = () => {

   const web3 = new Web3(window.ethereum);
   const stocks = useSelector((store) => store.stocks);

   const walletAddress = useSelector((store) => store.walletAddress);
   const [traderAddress, setTraderAddress] = useState("");

   const handleChange = (e) => {
      setTraderAddress(e.target.value);
   };

   const withdrawToWallet = () => {
      const traderContract = new web3.eth.Contract(Trader.abi, traderAddress);
      traderContract.methods
         .withdraw()
         .send({
            from: walletAddress,
            gas: 1500000,
         })
         .then((res) => {
            const amount = res.events.printUint.returnValues[0] / 10 ** 18;
            if (amount === 0) {
               alert("No Eth to be credited. Dont withdraw empty amounts");
            } else {
               alert(`Credited ${amount * 10**18} Wei to your wallet`);
            }
         });
   };

   return (
      <div className="flex flex-col items-center p-5">
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

            <button
               onClick={() => withdrawToWallet()}
               className="bg-green-600 text-white w-full px-4 py-3 rounded-lg"
            >
               Withdraw Money to Wallet
            </button>

            <div className="py-10">
               {stocks.map((stock, index) => {
                  return (
                     <BuyStockCard
                        key={index}
                        name={stock.name}
                        traderAddress={traderAddress}
                     />
                  );
               })}
            </div>
         </div>
      </div>
   );
};
export default MarketPlace;
