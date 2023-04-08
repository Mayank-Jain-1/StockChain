const initialState = [];

const tradersReducer = (state = initialState, action) => {
   switch (action.type) {
      case "ADD_TRADERS":
         return action.traders;
      default:
         return state;
   }
};

export default tradersReducer