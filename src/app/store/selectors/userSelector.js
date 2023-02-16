import { createSelector } from "@reduxjs/toolkit";

const userSelector = createSelector(
    state => state.user,
    (state) => {
        const isAuth = !!state.token; 
        return {isAuth, ...state}
    }
)

export default userSelector;