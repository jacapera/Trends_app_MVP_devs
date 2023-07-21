import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../Redux/UsersSlice"

const store = configureStore({
    reducer: {
        users: usersReducer,
    },
    devTools: true,
});

export default store;