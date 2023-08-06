import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isMinimized: false,
  error:"",
  message:"",
  listChats:[],
}

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setIsMinimized: (state, action) => {
      state.isMinimized = action.payload;;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setListChats: (state, action) => {
      state.listChats = action.payload;
    },
  }
})

export const { setIsMinimized, setError, setMessage, setListChats } = chatSlice.actions;
export default chatSlice.reducer;
export const selectIsMinimized = (state) => state.chat.isMinimized;
export const selectError = (state) => state.chat.error;
export const selectMessage = (state) => state.chat.message;