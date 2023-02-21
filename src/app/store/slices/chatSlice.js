import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    chatId: ""
}

const chatSlice = createSlice({
    name: "userChat",
    initialState,
    reducers: {
        changeUser: (state, action) => {
            const {user, currentUser} = action.payload;
            state.user = user;
            state.chatId = currentUser.id > user.uid
                ? currentUser.id + user.uid
                : user.uid + currentUser.id;
        }
    }
});

export const { changeUser } = chatSlice.actions;
export default chatSlice.reducer;