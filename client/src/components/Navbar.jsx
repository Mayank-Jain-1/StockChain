import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWalletAddress } from "../actions";
import { Link } from "react-router-dom";

const Navbar = () => {
   const dispatch = useDispatch();
   const walletAddress = useSelector((store) => store.walletAddress);
   useEffect(() => {
      getCurrentwallet();
      addWalletListener();
   });

   const [page, setPage] = useState('home');

   const connectwallet = async () => {
      if (
         typeof window != "undefined" &&
         typeof window.ethereum != "undefined"
      ) {
         try {
            const accounts = await window.ethereum.request({
               method: "eth_requestAccounts",
            });
            dispatch(setWalletAddress(accounts[0]));
         } catch (err) {
            console.error(err.message);
         }
      } else {
         console.log("Install Metamask");
      }
   };
   const getCurrentwallet = async () => {
      if (
         typeof window != "undefined" &&
         typeof window.ethereum != "undefined"
      ) {
         try {
            const accounts = await window.ethereum.request({
               method: "eth_accounts",
            });
            if (accounts.length > 0) {
               dispatch(setWalletAddress(accounts[0]));
            } else {
               console.log("Connect to MetaMask Wallet");
            }
         } catch (err) {
            console.error(err.message);
         }
      } else {
         console.log("Install Metamask");
      }
   };
   const addWalletListener = async () => {
      if (
         typeof window != "undefined" &&
         typeof window.ethereum != "undefined"
      ) {
         window.ethereum.on("accountsChanged", (accounts) => {
            dispatch(setWalletAddress(accounts[0]));
         });
      } else {
         console.log("Install Metamask");
      }
   };
   return (
      <>
         <div
            className="bg-black flex 
      justify-between px-5 py-3 items-center"
         >
            <h1 className="text-3xl text-white font-serif">StockChain</h1>
            <button
               className="border-2 border-white p-3 rounded-lg text-primary"
               type="button"
               onClick={connectwallet}
            >
               {walletAddress && walletAddress.length > 0
                  ? `Connected: ${walletAddress.substring(
                       0,
                       6
                    )}...${walletAddress.substring(38)}`
                  : "Connect Wallet"}
            </button>
         </div>
         <div className="flex items-center  justify-center shadow-lg  bg-black p-3 border-y-1 border-white">
            <ul className="space-x-3">
               <Link onClick={() => setPage('home')} className={`p-3 ${page === 
               'home' ? 'text-primary' : 'text-white'}`} to="/home">
                  Home
               </Link>
               <Link onClick={() => setPage('stocks')} className={`p-3 ${page === 
               'stocks' ? 'text-primary' : 'text-white'}`} to="/stocks">
                  Stocks
               </Link>
               <Link onClick={() => setPage('deploy')} className={`p-3  ${page === 
               'deploy' ? 'text-primary' : 'text-white'}`} to="/deploy">
                  Deploy
               </Link>
               <Link onClick={() => setPage('marketplace')} className={`p-3 ${page === 
               'marketplace' ? 'text-primary' : 'text-white'}`} to="/marketplace">
                  MarketPlace
               </Link>
            </ul>
         </div>
      </>
   );
};

export default Navbar;
