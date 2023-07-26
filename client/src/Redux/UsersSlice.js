import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    allUsers: [],
    searchedUsers: [],
    students: [],
    professionals: [],
    companies: []
};


const getSearchedUsers = createAsyncThunk("users/getSearchedUsers", async() =>{
     try {
        const searchedUsers = await axios.get("RUTA A DEFINIR POR EL BACK")
        return searchedUsers;
     } catch (error) {
        throw new Error(error.message);
     }
})


const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getSearchedUsers.pending, (state)=>{
                state.searchedUsers = []; //Esto queda vacío porque despues podemos poner que si searchedUsers.length === 0 muestre un símbolo de carga
            })
            .addCase(getSearchedUsers.fulfilled, (state, action)=>{
                state.searchedUsers = action.payload;
            })
    }
})

export default usersSlice.reducer;

// export of the selectors of the global state
export {getSearchedUsers};
export const selectAllUsers = (state) => state.users.allUsers;
export const selectSearchedUsers = (state) => state.users.searchedUsers;
export const selectStudents = (state) => state.users.students;
export const selectProfessionals = (state) => state.users.professionals;
export const selectCompanies = (state) => state.users.companies;