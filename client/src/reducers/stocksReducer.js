const initialState = [];

const stockReducer = (state = initialState, action) => {
   switch (action.type) {
      case "ADD_STOCKS":
         return action.stocks;
      default:
         return state;
   }
};

export default stockReducer;