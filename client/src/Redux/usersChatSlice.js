import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user_id:"",
  userName:"",
  image:"",
  rol:"",
  allUsersChat:[],
  avatars:[
    {name:"Robert Downey JR.", url:"https://i.pinimg.com/564x/a2/c5/30/a2c53085501ca10f2193b95da718a3e8.jpg"},
    {name: "Margot Robbie", url:"https://i.pinimg.com/564x/93/2c/20/932c206966b03ca75027f9c156bf8279.jpg"},
    {name: "Ryan Reynolds", url:"https://i.pinimg.com/736x/af/f9/fe/aff9fe93c4e964dafa0caafb124d3674.jpg"},
    {name: "Scarlett Johansson", url:"https://i.pinimg.com/564x/cb/e0/82/cbe082ce73c4d8d4a7f7c4abaffc71e1.jpg"},
  ],
}

const usersChatSlice = createSlice({
  name: "usersChat",
  initialState,
  reducers: {
    setUserChat: (state, action) => {
      const {user_id, userName, image, access, rol} = action.payload;
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
