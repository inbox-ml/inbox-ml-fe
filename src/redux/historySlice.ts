import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type HistoryItemProps = {
   id: string;
   summaryTitle: string;
   isScam: boolean;
   category: string;
   summary: string;
}

const initialState: HistoryItemProps[] = []

const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
        setHistoryList: (state, action: PayloadAction<HistoryItemProps[]>) => {
            const exsistingIds = state.map(item => item.id)
            return [...state, ...(action.payload.filter(item => !exsistingIds.includes(item.id)))]
        },
        resetHistoryList: () => {
           return initialState
        }
    }
})

export const {setHistoryList, resetHistoryList} = historySlice.actions
export default historySlice.reducer
export type {HistoryItemProps}