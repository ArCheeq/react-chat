import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    displayName: "",
    email: "",
    photoURL: "",
    token: "",
    id: ""
}

const userSlice = createSlice({
    name: "name",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.displayName = action.payload.displayName;
            state.email = action.payload.email;
            state.photoURL = action.payload.photoURL;
            state.token = action.payload.token;
            state.id = action.payload.id;
        },
        removeUser: (state) => {
            state.displayName = "";
            state.email = "";
            state.photoURL = "";
            state.token = "";
            state.id = "";
        }
    }
});

export const {setUser, removeUser} = userSlice.actions;
export default userSlice.reducer;