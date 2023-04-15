import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MarketPlace from "./pages/MarketPlace";
import Deploy from "./pages/Deploy.jsx";
import Whitelist from "./abis/Whitelist.json";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { addStocks, addTraders, setWhitelistAddress } from "./actions/index";
import axios from "axios";
import Trader from "./pages/Trader";
import Web3 from "web3";


const App = () => {
   const web3 = new Web3(window.ethereum);
   const dispatch = useDispatch();
   const address = useSelector((store) => store.walletAddress);
   const stocks = useSelector((store) => store.stocks);
   const whitelistAddress = useSelector((store) => store.whitelistAddress);

   const getStocks = () => {
      const whitelistContract = new web3.eth.Contract(
         Whitelist.abi,
         whitelistAddress
      );
      whitelistContract.methods
         .getStocks()
         .call()
         .then((res) => {
            dispatch(addStocks(res.slice(1)));
            console.log("Res: ", res);
         })
         .catch((err) => {
            console.log("err from here", err);
         });
   };

   const getTraders = () => {
      const whitelistContract = new web3.eth.Contract(
         Whitelist.abi,
         whitelistAddress
      );
      whitelistContract.methods
         .getTraders()
         .call()
         .then((res) => {
            dispatch(addTraders(res.slice(1)));
         })
         .catch((err) => {});
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
               gas: 2000000,
            })
            .then((receipt) => {
               console.log("receipt: ", receipt);
               dispatch(setWhitelistAddress(receipt._address));
               axios.post("/whitelistaddress", {
                  address: receipt._address,
               });
            });
      } else {
         console.log("Wallet not connected or wrong address");
      }
   };

   useEffect(() => {
      if (whitelistAddress) {
         getStocks();
         getTraders();
      }
   }, [whitelistAddress]);

   // const getWeb3 = async () => {
   //    web3 = await (getWeb3);
   // }

   // useEffect(() => {

   //    const web3 = await(getWeb3);
   // }, []);

   useEffect(() => {
      if (!whitelistAddress) {
         axios.get("/whitelistaddress").then((res) => {
            if (!res.data || !res.data[0]) {
               deployWhitelist();
            } else {
               dispatch(setWhitelistAddress(res.data[0].address));
            }
         });
      }
   }, [address]);

   return (
      <BrowserRouter>
         <Navbar />
         <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/deploy" element={<Deploy />} />
            <Route path="/marketplace" element={<MarketPlace />} />
            <Route path="/trader" element={<Trader />} />
         </Routes>
      </BrowserRouter>
   );
};

export default App;
