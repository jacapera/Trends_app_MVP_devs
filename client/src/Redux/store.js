import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./UsersSlice";
import usersChatReducer from "./usersChatSlice";
import chatReducer from './chatSlice';


const store = configureStore({
    reducer: {
        users: usersReducer,

        usersChat: usersChatReducer,
        chat: chatReducer,
        
    },
    // middleware of the redux devtools
    devTools: true,
});

export default store;