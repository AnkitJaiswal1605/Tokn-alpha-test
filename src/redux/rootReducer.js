import { combineReducers } from "redux";
import { userReducer } from "./user/userReducers";
import { walletReducer } from "./userWallet/walletReducers";

const rootReducer = combineReducers({
  user: userReducer,
  wallet: walletReducer,
});

export default rootReducer;
