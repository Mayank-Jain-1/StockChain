const initialState = "";

const whitelistReducer = (state = initialState, action) => {
   switch (action.type) {
      case "SET_WHITELIST":
         return action.address;
      default:
         return state;
   }
};

export default whitelistReducer;
