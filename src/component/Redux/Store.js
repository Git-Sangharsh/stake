import { configureStore } from '@reduxjs/toolkit';

const initialState = {
    viewWallet: false,
    walletBalance: 0.00,

}

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_VIEW_WALLET':
            return { ...state, viewWallet: action.payload };
        case 'SET_WALLET_BALANCE':
            return { ...state, walletBalance: action.payload };
        default:
            return state;
    }
};


const store = configureStore({
    reducer: Reducer
})

export default store;