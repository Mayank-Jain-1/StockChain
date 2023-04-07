import { combineReducers } from "redux";
import whitelistReducer from './whitelistReducer'
import walletAddressReducer from './walletAddressReducer'
import stockReducer from "./stocksReducer";


const rootReducer = combineReducers({
    whitelistAddress: whitelistReducer,
    walletAddress: walletAddressReducer,
    stocks: stockReducer
})

export default rootReducer;