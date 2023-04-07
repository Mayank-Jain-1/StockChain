export const setWhitelistAddress = (address) => {
  return{
    type: "SET_WHITELIST",
    address: address
  }
}


export const setWalletAddress = (address) => {
  return {
    type: "SET_WALLET_ADDRESS",
    address: address
  }
}


export const addStocks = (stocks) => {
  return {
    type: "ADD_STOCKS",
    stocks: stocks
  }
}