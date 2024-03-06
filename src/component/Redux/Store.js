import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
    viewWallet: false,
    walletBalance: 0.00,
}

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_VIEW_WALLET':
            return { ...state, viewWallet: action.payload };
        case 'SET_WALLET_BALANCE':
            return { ...state, walletBalance: state.walletBalance + action.payload };
        default:
            return state;
    }
};

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, Reducer);

const store = configureStore({
    reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
