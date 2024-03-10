import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  viewWallet: false,
  walletBalance: 0.0,
  betAmount: 0.0,
  betActive: false,
  mineEncounter: false,
  mineCounter: 5
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_VIEW_WALLET":
      return { ...state, viewWallet: action.payload };
    case "SET_WALLET_BALANCE":
      return { ...state, walletBalance: state.walletBalance + action.payload };
    case "SET_BET_AMOUNT":
      const newWalletBalance = state.walletBalance - action.payload;
      return {
        ...state, betAmount: action.payload, walletBalance: newWalletBalance,};
    case "SET_BET_ACTIVE":
      return { ...state, betActive: action.payload };
    case "SET_MINE_ENCOUNTER":
      return {...state, mineEncounter: action.payload};
    case "SET_MINE_COUNTER":
      return {...state, mineCounter: action.payload};
    default:
      return state;
  }
};

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, Reducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
