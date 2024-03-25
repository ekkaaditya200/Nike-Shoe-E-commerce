import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist'
import { combineReducers } from "@reduxjs/toolkit";


const persistConfig = {
    key:'root',
    version:1,
    storage,
}

const reducer = combineReducers({
    auth: authReducer,
    cart:cartReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

const Store = configureStore({
    reducer:persistedReducer
})

export default Store;