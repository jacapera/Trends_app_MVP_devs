import { createAsyncThunk ,createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const viteUrl = import.meta.env.VITE_URL;

const initialState = {
  isMinimized: false,
  error:"",
  message:"",
  selectedUser:{},
  listChats:[],
  listMessages:[],
}

const setListChats = createAsyncThunk("chat/setListChats", async (user_id) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/v1/chatroom/conversations/${user_id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

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
    setSelectedUser: (state, action) => {
      const {id, isGroup} = action.payload;
      state.selectedUser = state.listChats.filter(chat => (chat.id === id && chat.isGroup === isGroup))[0];
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(setListChats.pending, (state) => {
      state.listChats = [];
    })
    .addCase(setListChats.fulfilled, (state, action) => {
      state.listChats = action.payload;
    })
  }
})

export {setListChats};
export const { setIsMinimized, setError, setMessage, setSelectedUser } = chatSlice.actions;
export default chatSlice.reducer;

export const selectSelectedUser = (state) => state.chat.selectedUser;
export const selectListChats = (state) => state.chat.listChats;
export const selectIsMinimized = (state) => state.chat.isMinimized;
export const selectError = (state) => state.chat.error;
export const selectMessage = (state) => state.chat.message;