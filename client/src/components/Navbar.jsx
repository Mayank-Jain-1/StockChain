import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWalletAddress } from "../actions";

const Navbar = () => {
   const dispatch = useDispatch();
   const walletAddress = useSelector(store => store.walletAddress);
   console.log('walletAddress: ', walletAddress);
   useEffect(() => {
      getCurrentwallet();
      addWalletListener();
   });

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
            console.log(accounts[0]);
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
               console.log(accounts[0]);
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
            console.log(accounts[0]);
         });
      } else {
         dispatch(setWalletAddress(''));
         console.log("Install Metamask");
      }
   };
   return <div
   className="bg-black flex justify-between px-5 py-3 items-center">
    <h1 className="text-3xl text-white font-serif">StockChain</h1>
    <button className="border-2 border-white p-3 rounded-lg text-primary" type="button" onClick={connectwallet}>
            {walletAddress && walletAddress.length > 0
               ? `Connected: ${walletAddress.substring(
                    0,
                    6
                 )}...${walletAddress.substring(38)}`
               : "Connect Wallet"}
         </button>
   </div>;
};

export default Navbar;
