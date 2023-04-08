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
import { addStocks, setWhitelistAddress } from "./actions/index";
import axios from "axios";
const App = () => {
   const dispatch = useDispatch();
   const address = useSelector((store) => store.walletAddress);
   const stocks = useSelector((store) => store.stocks);
   const whiteListAddress = useSelector((store) => store.whitelistAddress);
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

   const getStocks = () => {
      axios.get("/stocks").then((res) => {
         dispatch(addStocks(res.data));
      });
   };

   const deployWhitelist = async () => {
      if (address) {
         const whitelistContract = new web3.eth.Contract(Whitelist.abi);

         whitelistContract
            .deploy({
               data: Whitelist.bytecode,
            })
            .send({
               from: address,
               gas: 1000000,
            })
            .on("receipt", (receipt) => {
               if (receipt.status === true) {
                  dispatch(setWhitelistAddress(receipt.contractAddress));
                  axios.post('/whitelistaddress', {
                     address: receipt.contractAddress
                  })
               }
            });
      } else {
         console.log("Wallet not connected or wrong address");
      }
   };

   useEffect(() => {
      getStocks();
   }, []);

   useEffect(() => {
      // axios.delete("/stocks/1").then(() => {
      //    axios.get("/stocks").then((res) => dispatch(addStocks(res.data)));
      // });
   }, []);

   useEffect(() => {
      if (!whiteListAddress) {
         axios.get("/whitelistaddress").then((res) => {
            if (!res.data || !res.data[0]) {
               deployWhitelist();
            }else{
               dispatch(setWhitelistAddress(res.data[0].address))
            }
         });
      }
   }, [address]);

   return (
      <BrowserRouter>
         <Navbar />
         <Routes>
            <Route path="/" element={<MarketPlace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/deploy" element={<Deploy />} />
            <Route path="/stocks/:name" element={<Stocks />} />
         </Routes>
      </BrowserRouter>
   );
};

export default App;
