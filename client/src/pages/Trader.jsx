import { useState } from "react";
import web3 from "../connections";
import Whitelist from "../abis/Whitelist.json";
import { useSelector } from "react-redux";
import TraderJSON from '../abis/Trader.json'


const Trader = () => {
   const whitelistAddress = useSelector((store) => store.whitelistAddress);
   const walletAddress = useSelector(store => store.walletAddress);
   const [isVerified, setIsVerified] = useState(false)
   const [traderAddress, setTraderAddress] = useState("");
   const handleChange = (e) => {
      setTraderAddress(e.target.value);
   };
   const [traderInfo, setTraderInfo] = useState({
      name: "",
      stocks: [],
   });
   console.log('traderInfo: ', traderInfo);

   const verifyTrader = async () => {
      try {
         const whitelistContract = new web3.eth.Contract(
            Whitelist.abi,
            whitelistAddress
         );
         const res = await whitelistContract.methods
            .verifyTrader(traderAddress)
            .call();
         return res;
      } catch (err) {
         console.log(err);
         return false;
      }
   };

   const fetchDetails = async () => {
      const isVerified = await verifyTrader();
      if (!isVerified) {
         alert("Couldnt Validate this Trader address, check your input");
         return;
      }
      setIsVerified(true);
      const traderContract = new web3.eth.Contract(TraderJSON.abi, traderAddress);
      traderContract.methods.getStocks().call({
         from: walletAddress
      })
      .then(res => {
         setTraderInfo({
            ...traderInfo,
            stocks: res
         })
      })
      .catch(err => {
         if(err.message.includes('Owner Only')){
            alert('Transactions can only be made by the traders Wallet address');
         }else{
            console.log(err);
         }
      });
   };

   return (
      <div className="flex flex-col items-center p-5">
         <div className="w-full max-w-3xl space-y-4">
            <h1 className="text-4xl text-center my-5">
               Check Trader information
            </h1>
            <label htmlFor="">Your trader address</label>
            <input
               type="text"
               name="companyName"
               onChange={(e) => handleChange(e)}
               value={traderAddress}
               placeholder="0x00000000000000000000000000000000000"
               className="p-3 border-2 border-black  rounded-md w-full"
            />
            <button
               onClick={() => fetchDetails()}
               className="bg-blue-500 text-white w-full px-4 py-3 rounded-lg"
            >
               Get Information
            </button>
         </div>
      </div>
   );
};

export default Trader;
