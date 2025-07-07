import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type HistoryItemProps = {
   id: string;
   summaryTitle: string;
   isScam: boolean;
   category: string;
   summary: string;
   createdAt: string;
   updatedAt: string;
   status: "archived" | "active"
}

type UpdateHistoryItemProps = Partial<HistoryItemProps>

const initialState: HistoryItemProps[] = []

const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
        setHistoryList: (state, action: PayloadAction<HistoryItemProps[]>) => {
            const exsistingIds = state.map(item => item.id)
            return [...state, ...(action.payload.filter(item => !exsistingIds.includes(item.id)))]
        },
        updateHistoryItem: (state, action: PayloadAction<UpdateHistoryItemProps>) => {
            const itemIndex = state.findIndex(item => action.payload.id === item.id);
            state[itemIndex] = {...state[itemIndex], ...action.payload}
        },
        resetHistoryList: () => {
           return initialState
        }
    }
})

export const {setHistoryList, resetHistoryList, updateHistoryItem} = historySlice.actions
export default historySlice.reducer
export type {HistoryItemProps}