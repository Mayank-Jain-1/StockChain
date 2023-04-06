const initialState = "";

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
