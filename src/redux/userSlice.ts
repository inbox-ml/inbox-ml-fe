import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UserProps = {
    token?: string,
    firstName: string;
    lastName: string;
    email: string;
    age?: number
}

const initialState: UserProps = {
    firstName: "",
    lastName: "",
    email: ""
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserProps>) => {
            return {...state, ...(action.payload)}
        },
        setToken: (state, action: PayloadAction<Pick<UserProps, "token">>) => {
            return {...state, ...(action.payload)}
        },
        resetUser: () => {
           return initialState
        }
    }
})

export const {setUser, resetUser, setToken} = userSlice.actions
export default userSlice.reducer
export type {UserProps}