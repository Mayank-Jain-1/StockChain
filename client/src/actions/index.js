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