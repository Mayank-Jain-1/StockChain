const initialState = "0x18B2AdADbD56DFA8b88E6c895325b46C9364749a";

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
