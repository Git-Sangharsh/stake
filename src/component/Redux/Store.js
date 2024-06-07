import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  viewWallet: false,
  walletBalance: 0,
  betActive: false,
  betAmount: 0.0,
  profitFromBet: 0,
  profitMultiplier: 0.0,
  profitBox: false,
  diceBetActive: false,
  diceBetWin: false,
  diceEstimatedProfit: 0,
  mineEncounter: false,
  mineCounter: 5,
  cashOutAmount: 0.0,
  notEnoughBalance: false,
  viewProfileDropDown: true,
  viewRegister: false,
  viewSignin: false,
  userEmail: "",
  login: false,
  betCounter: 0,
  betCounterWin: 0,
  betCounterLoss: 0,
  betCounterWagered: 0,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_VIEW_WALLET":
      return { ...state, viewWallet: action.payload };
    case "SET_WALLET_BALANCE":
      const newBalance = +state.walletBalance + action.payload;
      return { ...state, walletBalance: newBalance };
    case "SET_BET_AMOUNT":
      const newWalletBalance = state.walletBalance - action.payload;
      return {
        ...state,
        betAmount: action.payload,
        walletBalance: newWalletBalance.toFixed(2),
      };
    case "SET_BET_ACTIVE":
      return { ...state, betActive: action.payload };
    case "SET_PROFIT_FROM_BET":
      return { ...state, profitFromBet: action.payload };
    case "SET_PROFIT_MULTIPLIER":
      return { ...state, profitMultiplier: action.payload };
    case "SET_PROFIT_BOX":
      return { ...state, profitBox: action.payload };
    case "SET_DICE_BET_ACTIVE":
      return { ...state, diceBetActive: action.payload };
    case "SET_DICE_BET_WIN":
      return { ...state, diceBetWin: action.payload };
    case "SET_DICE_ESTIMATED_PROFIT":
      return { ...state, diceEstimatedProfit: action.payload };
    case "SET_PROFIT_FROM_DICE":
      const currentWalletBalance = parseFloat(state.walletBalance);
      const profitFromDice = parseFloat(action.payload);
      const newWalletBalanceFromDice = currentWalletBalance + profitFromDice;
      return {
        ...state,
        walletBalance: parseFloat(newWalletBalanceFromDice.toFixed(2)),
      };

    case "SET_MINE_ENCOUNTER":
      return { ...state, mineEncounter: action.payload };
    case "SET_MINE_COUNTER":
      return { ...state, mineCounter: action.payload };
    case "SET_CASH_OUT_AMOUNT":
      const walletBalance = parseFloat(state.walletBalance);
      const profitFromBet = parseFloat(state.profitFromBet);
      const updatedWalletBalance = (walletBalance + profitFromBet).toFixed(2);

      return {
        ...state,
        walletBalance: parseFloat(updatedWalletBalance), // Convert back to number
        profitFromBet: 0,
      };

    case "SET_NOT_ENOUGH_BALANCE":
      return { ...state, notEnoughBalance: action.payload };
    case "SET_PROFIT_FROM_LIMBO":
      const newWalletBalanceFromLimbo = state.walletBalance + action.payload;
      return { ...state, walletBalance: newWalletBalanceFromLimbo };
    case "SET_VIEW_PROFILE_DROPDOWN":
      return { ...state, viewProfileDropDown: action.payload };
    case "SET_VIEW_REGISTER":
      return { ...state, viewRegister: action.payload };
    case "SET_VIEW_SIGNIN":
      return { ...state, viewSignin: action.payload };
    case "SET_USER_EMAIL":
      return { ...state, userEmail: action.payload };
    case "SET_LOG_IN":
      return { ...state, login: action.payload };
    case "SET_BET_COUNTER":
      return { ...state, betCounter: state.betCounter + 1 };
    case "SET_BET_COUNTER_WIN": {
      return { ...state, betCounterWin: state.betCounterWin + 1 };
    }
    case "SET_BET_COUNTER_LOSS": {
      return { ...state, betCounterLoss: state.betCounterLoss + 1 };
    }
    case "SET_BET_COUNTER_WAGERED_AMOUNT": {
      const payload = Number(action.payload); // Ensure payload is a number
      const NumberbetCounterWagered = Number(state.betCounterWagered);
      return {
        ...state,
        betCounterWagered: NumberbetCounterWagered + payload,
      };
    }
    case "GET_SET_BET_COUNTER":
      return { ...state, betCounter: action.payload };
    case "GET_SET_BET_COUNTER_WIN":
      return { ...state, betCounterWin: action.payload };
    case "GET_SET_BET_COUNTER_LOSS":
      return { ...state, betCounterLoss: action.payload };
    case "GET_SET_BET_COUNTER_WAGERED_AMOUNT": {
      return { ...state, betCounterWagered: action.payload };
    }
    case "RESET_BET_COUNTER_ON_LOGOUT": {
      return { ...state, betCounter: 0, betCounterWin: 0, betCounterLoss: 0, betCounterWagered: 0}
    }
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
