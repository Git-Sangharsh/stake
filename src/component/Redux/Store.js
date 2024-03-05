import { configureStore } from '@reduxjs/toolkit';

const initialState = {
    viewWallet: false
}

const Reducer = (state = initialState, action) => {
    switch (action.type){
        case 'SET_VIEW_WALLET':
        return {...state, viewWallet: action.payload}
    default:
        return state;
    }
}


const store = configureStore({
    reducer: Reducer
})

export default store;