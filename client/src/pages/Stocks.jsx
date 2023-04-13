import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import StockCard from "../components/deploy/StockCard";
const Stocks = () => {

   const {name} = useParams();
   const stocks = useSelector(store => store.stocks);
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
      <div className="flex flex-col items-center">
         <div className="max-w-3xl p-5 w-full">
            {stocks && stocks
               .slice()
               .reverse()
               .map((stock) => {
                  return <StockCard key={stock.name} name={stock.name} />;
               })}
         </div>
      </div>
   );
};

export default Stocks;
