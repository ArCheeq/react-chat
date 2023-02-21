import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/userSlice";
import userChat from "./slices/chatSlice";

const store = configureStore({
    reducer: {
        user,
        userChat
    }
});

export default store;