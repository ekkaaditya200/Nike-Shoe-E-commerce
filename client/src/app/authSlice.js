import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    userId:"",
    username: "",
    email: "",
};
const authSlice = createSlice({
    initialState,
    name: "user",
    reducers: {
        login(state,action)
        {
            state.isLoggedIn=true;
            state.userId=action.payload.userId
            state.username=action.payload.username;
            state.email=action.payload.email;
        },
        logout(state)
        {
            state.isLoggedIn=false;
            state.userId="";
            state.username="";
            state.email="";
        }
    }
})

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;