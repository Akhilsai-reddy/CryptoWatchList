import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import binanceReducer from "./Binance/Reducer";
import watchListReducer from "./Watchlist/Reducer";

const rootReducer=combineReducers({
    cryptos:binanceReducer,
    watchList:watchListReducer
})

export const store= configureStore({
    reducer:rootReducer,
})
 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;