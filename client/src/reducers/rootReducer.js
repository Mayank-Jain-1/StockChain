import { combineReducers } from "redux";
import whitelistReducer from './whitelistReducer'
import walletAddressReducer from './walletAddressReducer'
import stockReducer from "./stocksReducer";
import governmentAddressReducer from "./governmentAddressReducer";
import tradersReducer from "./tradersReducer";


const rootReducer = combineReducers({
    whitelistAddress: whitelistReducer,
    walletAddress: walletAddressReducer,
    stocks: stockReducer,
    governmentAccount:governmentAddressReducer,
    traders: tradersReducer
})

export default rootReducer;