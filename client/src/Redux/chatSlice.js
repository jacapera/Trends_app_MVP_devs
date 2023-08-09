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
}

const getListChats = createAsyncThunk("chat/getListChats", async(user_id) =>{
  try {
    const {data} = await axios.get(`${VITE_URL}/api/v1/chatroom/conversations/${user_id}`, { withCredentials:"include"})
    return data;
  } catch (error) {
    if (error.response && error.response.data) {
      return { error: error.response.data };
    } else {
      return { error: "An error occurred" };
    }
  }

})
// const setListMessages = createAsyncThunk("chat/setListMessages", async(id) =>{
//   try {
//     const {data} = await axios.get(`${VITE_URL}/api/v1/chatroom/chat/${id}/messages`, { withCredentials:"include"})
//     data.messages.reverse();
//     console.log("DATA: ", data)
//     return data;
//   } catch (error) {
//     return error;
//   }
// })

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
      const {id, isGroup, allUsers} = action.payload;
      console.log("soy un: ", typeof state.listChats)
      console.log(typeof id)
      if(typeof id === "number"){
        console.log("stoy aca")
        console.log(id, isGroup)
        state.selectedUser = state.listChats.find(chat => (chat.id === id && chat.isGroup === isGroup));
        console.log("allUser-chatslice: ", state.selectedUser)
      } else {
        console.log(id, isGroup)
        state.selectedUser = allUsers?.data.find(user => (user.id === id));
        console.log("allUser-chatslice: ", state.selectedUser)
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
    // .addCase(setListMessages.pending, (state) => {
    //   console.log("cargando...");
    // })
    // .addCase(setListMessages.fulfilled, (state, action) => {
    //   state.listMessages = action.payload;
    // })
  }
})

export {getListChats};
export const { setIsMinimized, setError, setMessage, setSelectedUser, setListMessages } = chatSlice.actions;
export default chatSlice.reducer;

export const selectSelectedUser = (state) => state.chat.selectedUser;
export const selectListChats = (state) => state.chat.listChats;
export const selectListMessages = (state) => state.chat.listMessages;
export const selectIsMinimized = (state) => state.chat.isMinimized;
export const selectError = (state) => state.chat.error;
export const selectMessage = (state) => state.chat.message;