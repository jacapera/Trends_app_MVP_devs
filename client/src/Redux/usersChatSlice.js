import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user_id:"",
  userName:"",
  image:"",
  rol:"",
  allUsersChat:[],
}

const usersChatSlice = createSlice({
  name: "usersChat",
  initialState,
  reducers: {
    setUserChat: (state, action) => {
      const {user_id, userName, image, rol} = action.payload;
      state.user_id = user_id;
      state.userName = userName;
      state.image = image;
      state.rol = rol;
    },
    setUserName:(state, action) => {
      state.userName = action.payload;
    },
    setUserImage:(state, action) => {
      state.image = action.payload;
    },
    setAllUsersChat: (state, action) => {
      state.allUsersChat = action.payload;
    }

  }
})

export const { setUserChat, setAllUsersChat, setUserName, setUserImage } = usersChatSlice.actions;
export default usersChatSlice.reducer;
export const selectAllUsersChat = (state) => state.usersChat.allUsersChat;
