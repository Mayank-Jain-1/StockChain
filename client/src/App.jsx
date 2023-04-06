import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Stocks from "./pages/Stocks";
import Deploy from "./pages/deploy";
import MarketPlace from "./pages/MarketPlace";
import web3 from "./connections";
import Whitelist from "./abis/Whitelist.json";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setWhitelistAddress } from "./actions/index";
const App = () => {

	const dispatch = useDispatch();
   const address = useSelector(store => store.walletAddress);
	const whiteListAddress = useSelector(store=> store.whiteListAddress);
  	const [account, setAccount] = useState(['0x8661cd3bd7fddd4f66385238f8e49f2fbac6701d5c0083baa5290e87c849f73f',

]);
   // const deployStock = async () => {
   //    if (
   //       !deployParams.companyName ||
   //       deployParams.amount < 0 ||
   //       deployParams.initialPrice < 0
   //    ) {
   //       alert("Enter all the parameters");
   //       return;
   //    }
   //    const mainAccount = accounts[accounts.length - 1];
   //    const ABI = Stock.abi;
   //    const bytecode = Stock.bytecode;
   //    const contract = new web3.eth.Contract(ABI);
   //    const contractDeployed = await contract
   //       .deploy({
   //          data: bytecode,
   //          arguments: [
   //             deployParams.companyName,
   //             deployParams.amount,
   //             deployParams.initialPrice,
   //          ],
   //       })
   //       .send({ from: mainAccount, gas: 1500000 })
   //       .on("receipt", (receipt) => {
   //          console.log("contract Address: ", receipt.contractAddress);
   //          setMessage("Contract Deplpyed at " + receipt.contractAddress);
   //       });
   // };

   const deployWhitelist = async () => {
      if(address){

         const whitelistContract = new web3.eth.Contract(Whitelist.abi);
         const deployedWhitelist = await whitelistContract
         .deploy({
            data: Whitelist.bytecode,
         })
         .send({ 
            from: address,
				gas: 1000000
         })
         .on("receipt", (receipt) => {
            dispatch(setWhitelistAddress(receipt.contractAddress));
			});
      }
      else{
         console.log("Wallet not connected or wrong address");
      }
   }

   useEffect(() => {
      if(!whiteListAddress){
         deployWhitelist();
      }
	}, [address]);

   return (
      <BrowserRouter>
			<Navbar />
         <Routes>
            <Route path="/" element={<MarketPlace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/deploy" element={<Deploy />} />
            <Route path="/stocks" element={<Stocks />} />
         </Routes>
      </BrowserRouter>
   );
};

export default App;
