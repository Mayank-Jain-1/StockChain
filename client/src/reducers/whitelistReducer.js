const initialState = "0x19b4151dbc202a4E9c4Fd6826740541e39cf2a24";

const whitelistReducer = (state = initialState, action) => {
   switch (action.type) {
      case "SET_WHITELIST":
         console.log("Whitelist deployed at:", action.address);
         return action.address;
      default:
         return state;
   }
};

export default whitelistReducer;
