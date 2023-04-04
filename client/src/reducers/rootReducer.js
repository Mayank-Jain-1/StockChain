import { combineReducers } from "redux";
import whitelistReducer from './whitelistReducer'

const rootReducer = combineReducers({
    whiteListAddress: whitelistReducer,
})

export default rootReducer;