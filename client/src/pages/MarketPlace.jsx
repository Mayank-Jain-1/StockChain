import { useEffect,useState } from "react";
//import "./App.css";
const MarketPlace = () => {
  const [walletAddress ,setWalletAddress] = useState("");
  useEffect(() => {
    getCurrentwallet();
    addWalletListener();
  });

  const connectwallet = async() => {
    if(typeof window != "undefined" && typeof window.ethereum != "undefined"){
      try{
        const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);

      }catch(err){
        console.error(err.message);
      }
    }
    else{
      console.log("Install Metamask")
    }
  };
  const getCurrentwallet = async() => {
    if(typeof window != "undefined" && typeof window.ethereum != "undefined"){
      try{
        const accounts = await window.ethereum.request({method: "eth_accounts"});
        if(accounts.length > 0){
          setWalletAddress(accounts[0]);
          console.log(accounts[0]);  
        }
        else{
          console.log("Connect to MetaMask Wallet");
        }
      }catch(err){
        console.error(err.message);
      }
    }
    else{
      console.log("Install Metamask")
    }
  };
  const addWalletListener = async() => {
    if(typeof window != "undefined" && typeof window.ethereum != "undefined"){
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      });
      }
    else{
      setWalletAddress("");
      console.log("Install Metamask")
    }
  };

  return (
    <div>
      <button type="button" onClick={connectwallet}>
        {walletAddress && walletAddress.length > 0 ? `Connected: ${walletAddress.substring(0,6)}...${walletAddress.substring(38)}` :"Connect Wallet"}
      </button>
    </div>
  );
};
export default MarketPlace;
