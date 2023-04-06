import { combineReducers } from "redux";
import whitelistReducer from './whitelistReducer'
import walletAddressReducer from './walletAddressReducer'


const rootReducer = combineReducers({
    whitelistAddress: whitelistReducer,
    walletAddress: walletAddressReducer
})

export default rootReducer;