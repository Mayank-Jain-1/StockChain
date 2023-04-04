import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const MarketPlace = () => {
  const {name} = useParams();
  const [stockInfo, setStockInfo] = useState({
    name: "",
    price: 0,
    address: '',
  })

  const getInfo = () => {
    
  }

  useEffect(() => {

  })
  return (  
    <h1>{name}</h1>
  )
}

export default MarketPlace