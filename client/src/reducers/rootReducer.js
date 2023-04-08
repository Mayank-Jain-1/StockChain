import { combineReducers } from "redux";
import whitelistReducer from './whitelistReducer'
import walletAddressReducer from './walletAddressReducer'
import stockReducer from "./stocksReducer";
import governmentAddressReducer from "./governmentAddressReducer";


const rootReducer = combineReducers({
    whitelistAddress: whitelistReducer,
    walletAddress: walletAddressReducer,
    stocks: stockReducer,
    governmentAccount:governmentAddressReducer,
})

export default rootReducer;