import { useEffect, useState } from "react";
import web3 from "../connections";
import Whitelist from "../abis/Whitelist.json";
import { useSelector } from "react-redux";
import TraderJSON from "../abis/Trader.json";
import StockCard from "../components/trader/StockCard";

const Trader = () => {
   const whitelistAddress = useSelector((store) => store.whitelistAddress);
   const walletAddress = useSelector((store) => store.walletAddress);
   const [isVerified, setIsVerified] = useState(false);
   const [traderAddress, setTraderAddress] = useState("");
   const handleChange = (e) => {
      setTraderAddress(e.target.value);
   };
   const [traderInfo, setTraderInfo] = useState({
      name: "",
      stocks: [],
   });

   const verifyTrader = async () => {
      try {
         const whitelistContract = new web3.eth.Contract(
            Whitelist.abi,
            whitelistAddress
         );
         const res = await whitelistContract.methods
            .verifyTrader(traderAddress)
            .call()
            .then((res) => {
               return res;
            })
            .catch((err) => {
               console.log(err);
               return false;
            });
         return res;
      } catch (err) {
         console.log(err);
         return false;
      }
   };

   const fetchStocks = async () => {
      const traderContract = new web3.eth.Contract(
         TraderJSON.abi,
         traderAddress
      );
      const stocks = traderContract.methods
         .getStocks()
         .call({
            from: walletAddress,
         })
         .then((res) => {
            return res;
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
      return stocks;
   };

   const fetchName = async () => {
      const traderContract = new web3.eth.Contract(
         TraderJSON.abi,
         traderAddress
      );
      const name = await traderContract.methods
         .name()
         .call({
            from: walletAddress,
         })
         .then((res) => {
            return res;
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
      return name;
   };

   const fetchDetails = async () => {
      const isVerified = await verifyTrader();
      if (isVerified === false) {
         if(setIsVerified){
            setIsVerified(false);
         }
         setTraderInfo({
            name: "",
            stocks: [],
         });
         alert("Couldnt Validate this Trader address, check your input");
         return;
      }
      setIsVerified(true);
      const stocks = await fetchStocks();
      const name = await fetchName();
      setTraderInfo({
         name: name,
         stocks: stocks,
      });
   };

   useEffect(() => {
      if (isVerified) {
         const fetchLoop = setInterval(() => {
            fetchDetails();
         }, 1000);
         return () => {
            clearInterval(fetchLoop);
         };
      }
   }, [isVerified]);

   useEffect(() => {
      
   },[traderInfo.stocks])

   return (
      <div className="flex flex-col items-center p-5">
         <div className="w-full max-w-3xl space-y-4">
            <h1 className="text-4xl text-center my-5">
               Check Trader information
            </h1>
            <label className="text-xl p-3">Your trader address</label>
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
            <div>
               <h1 className="text-4xl text-center text-primary font-semibold my-5">
                  {traderInfo.name}
               </h1>
               <h1 className="text-xl p-3">Current Stock Holdings</h1>
               {traderInfo.stocks.slice(1).map((stock, index) => {
                  return (
                     <StockCard
                        key={index}
                        name={stock.name}
                        amount={stock.amount}
                        stockAddress={stock.stockAddress}
                        traderAddress={traderAddress}
                     />
                  );
               })}
            </div>
         </div>
      </div>
   );
};

export default Trader;
