import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./redux/userSlice"
import historyReducer from "./redux/historySlice"

export const store =  configureStore({
    reducer: {
        user: userReducer,
        history: historyReducer
    }
})

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];