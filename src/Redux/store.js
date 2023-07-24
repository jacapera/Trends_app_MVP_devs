import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../Redux/UsersSlice"

const store = configureStore({
    reducer: {
        users: usersReducer,
    },
    // middleware of the redux devtools
    devTools: true,
});

export default store;