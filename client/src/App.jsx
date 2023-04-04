import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Stocks from "./pages/Stocks";
import Deploy from "./pages/deploy";
import MarketPlace from "./pages/MarketPlace";
import web3 from "./connections";
import Whitelist from "./abis/Whitelist.json";
import Navbar from "./components/Navbar";
const App = () => {
	
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
   //          axios.post("/");
   //       });
   // };

   const deployWhitelist = async () => {
      const whitelistContract = new web3.eth.Contract(Whitelist.abi);
      const deployedWhitelist = await whitelistContract
         .deploy({
            data: Whitelist.bytecode,
         })
         .send({ 
				from: '0x3BBD75b06EF48811963E8794457d8e1f6Ce95cC1',
				gas: 1000000
		 })
         .on("receipt", (receipt) => {
				console.log(receipt.contractAddress);
				
			});
   };

   useEffect(() => {
		deployWhitelist();
	});

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
