import { useEffect, useState } from "react";
import web3 from "../connections";
import Stock from "../abis/Stock.json";
import axios from "axios";
import { useParams } from "react-router-dom";

const Stocks = () => {

   const {name} = useParams();

   // const getPrice = async (address) => {
   //    const StockContract = new web3.eth.Contract(Stock.abi, address);
   //    StockContract.methods
   //       .currentPrice()
   //       .call()
   //       .then((res) => {
   //          console.log(res);
   //          setResult(web3.utils.toWei(res, "ether"));
   //       });
   // };
   // const buyOrder = async (address) => {
   //    const StockContract = new web3.eth.Contract(Stock.abi, address);
   //    const price = StockContract.methods
   //       .currentPrice()
   //       .call()
   //       .then((res) => {
   //          return setResult(web3.utils.toWei(res, "ether"));
   //       });
   //    StockContract.methods
   //       .buyOrder()
   //       .send({
   //          value: 1000000000000000000,
   //          from: accounts[0],
   //          gas: 1000000,
   //       })
   //       .then((res) => setResult("Sent Successfully"));
   // };
   // const sellOrder = async (address) => {
   //    const StockContract = new web3.eth.Contract(Stock.abi, address);
   //    StockContract.methods
   //       .sellOrder()
   //       .send({ from: accounts[0] })
   //       .then((res) => setResult("Sold successfuly"));
   // };

   return (
      <div>
         <h1>{name}</h1>
      </div>
   );
};

export default Stocks;
