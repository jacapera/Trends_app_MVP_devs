import { createAsyncThunk ,createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const {VITE_URL} = import.meta.env;

const initialState = {
  isMinimized: false,
  error:"",
  message:"",
  selectedUser:{},
  listChats:[],
  listMessages:[],
  newChat:false,
}

export const postMessage = createAsyncThunk("chat/postMessage", async ({content, receiver_id, sender_id}) =>{
  try {
    const { data } = await axios.post(`${VITE_URL}/api/v1/chatroom/message`,
      {content, receiver_id, sender_id}, {withCredentials:"include"})
    return data;
  } catch (error) {
    return error.response.data.error;
  }
});

export const getMessages = createAsyncThunk("chat/getMessages", async (chatId) => {
  try {
    const { data } = await axios.get(`${VITE_URL}/api/v1/chatroom/chat/${chatId}/messages?timestamp=${Date.now()}`,
      {withCredentials:"include"})
    return data
  } catch (error) {
    return error.response.data.error;
  }
});

export const getMessagesByChat = createAsyncThunk("chat/getMessagesByChat", async(id) => {
  try {
    const {data} = await axios.get(`${VITE_URL}/api/v1/chatroom/chat/${id}/messages?timestamp=${Date.now()}`,
    {withCredentials:"include"})
    data.messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    return data;
  } catch (error) {
    return error.response.data.error;
  }
});

const getListChats = createAsyncThunk("chat/getListChats", async(user_id) =>{
  try {
    const {data} = await axios.get(`${VITE_URL}/api/v1/chatroom/conversations/${user_id}?timestamp=${Date.now()}`, { withCredentials:"include"})
    return data;
  } catch (error) {
    return error.response.data.error;
  }
})

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
    setNewChat: (state, action) => {
      state.newChat = action.payload;
    },
    setSelectedUser: (state, action) => {
      const {id, isGroup, allUsers} = action.payload;
      if(typeof id === "number"){
        state.selectedUser = state.listChats.find(chat => (chat.id === id && chat.isGroup === isGroup));
      } else {
        state.selectedUser = allUsers?.data.find(user => (user.id === id));
      }
    },
    setListMessages: (state, action) => {
      state.listMessages = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(getListChats.pending, (state) => {
      state.listChats = [];
    })
    .addCase(getListChats.fulfilled, (state, action) => {
      state.listChats = action.payload;
    })
    .addCase(getListChats.rejected, (state, action) => {
      state.listChats = [];
    })
  }
})

export {getListChats};
export const { setIsMinimized, setError, setMessage, setSelectedUser, setListMessages, setNewChat } = chatSlice.actions;
export default chatSlice.reducer;

export const selectSelectedUser = (state) => state.chat.selectedUser;
export const selectListChats = (state) => state.chat.listChats;
export const selectListMessages = (state) => state.chat.listMessages;
export const selectIsMinimized = (state) => state.chat.isMinimized;
export const selectError = (state) => state.chat.error;
export const selectMessage = (state) => state.chat.message;
export const selectNewChat = (state) => state.chat.newChat;