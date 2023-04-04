const initalState = "";

const walletAddressReducer = (state = initalState, action) => {
   switch (action.type) {
      case "SET_WALLET_ADDRESS":
         return action.address;
      default:
         return state;
   }
};

export default walletAddressReducer;
