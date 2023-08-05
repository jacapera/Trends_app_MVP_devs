import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user_id:"",
  userName:"",
  image:"",
  access:false,
  rol:"",
  token:"",
  allUsersChat:[],
}

const usersChatSlice = createSlice({
  name: "usersChat",
  initialState,
  reducers: {
    setUserChat: (state, action) => {
      const {user_id, userName, image, access, rol, token} = action.payload;
      state.user_id = user_id;
      state.userName = userName;
      state.image = image;
      state.access = access;
      state.rol = rol;
      state.token = token;
    },
    setAllUsersChat: (state, action) => {
      state.allUsersChat = action.payload;
    }

  }
})

export const { setUserChat, setAllUsersChat } = usersChatSlice.actions;
export default usersChatSlice.reducer;
export const selectAllUsersChat = (state) => state.usersChat.allUsersChat;
