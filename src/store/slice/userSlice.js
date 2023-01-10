import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {token:null}
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        login:(state,{payload})=>{
            state.user = payload
        },
        logout:(state)=>{
            state.user = {token:null}
        }
    }
})

export default userSlice.reducer

export const {login, logout} = userSlice.actions