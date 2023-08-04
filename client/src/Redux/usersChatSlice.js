import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user_id:"",
  username:"",
  image:"",
  rol:"",
  token:"",
  allUsersChat:[],
  filteredUsersChat: [],
  shownUser:{},
}

const usersChatSlice = createSlice({
  name: "usersChat",
  initialState,
  reducers: {
    setUserChat: (state, action) => {
      const {user_id, username, image, rol} = action.payload;
      state.user_id = user_id;
      state.username = username;
      state.image = image;
      state.rol = rol;
    },
    setShownUser: (state, action) => {
      state.allUsersChat.filter((user) => {
        if(user.user_id === action.payload) {
          state.shownUser = user;
        }
      });
    },
    setFilteredUsersChat: (state, action) => {
      console.log(action.payload);
      state.filteredUsersChat = state.allUsersChat.filter(user => user.name.toLowerCase().includes(action.payload.toLowerCase()));
    },
    setUsername:(state, action) => {
      state.username = action.payload;
    },
    setUserImage:(state, action) => {
      state.image = action.payload;
    },
    setAllUsersChat: (state, action) => {
      state.allUsersChat = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    }

  }
})

export const { setFilteredUsersChat, setShownUser, setUserChat, setAllUsersChat, setUsername, setUserImage, setToken } = usersChatSlice.actions;
export default usersChatSlice.reducer;
export const selectFilteredUsersChat = (state) => state.usersChat.filteredUsersChat;
export const selectShownUser = (state) => state.usersChat.shownUser;
export const selectAllUsersChat = (state) => state.usersChat.allUsersChat;
