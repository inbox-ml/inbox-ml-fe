import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type HistoryItemProps = {
   id: string;
   isSpam: boolean;
   summary: string;
}

const initialState: HistoryItemProps[] = []

const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
        setHistoryList: (state, action: PayloadAction<HistoryItemProps[]>) => {
            return {...state, ...(action.payload)}
        },
        resetHistoryList: () => {
           return initialState
        }
    }
})

export const {setHistoryList, resetHistoryList} = historySlice.actions
export default historySlice.reducer
export type {HistoryItemProps}