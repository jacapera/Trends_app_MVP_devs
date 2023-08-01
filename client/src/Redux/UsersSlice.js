import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const {VITE_URL} = import.meta.env;


const URL = `${VITE_URL}/api/v1/user/profile`;

const initialState = {
    allUsers: [],
    searchedUsers: [],
    students: [],
    professionals: [],
    companies: [],
    user: {},
    test: false
};


const getUserData = createAsyncThunk("users/getUserData", async() => {
    try {
        const getData = await axios.get(URL);
        const result = getData.data;
        return result;
    } catch (error) {
        console.log(error.response.data.error);
    }
})

const getSearchedUsers = createAsyncThunk("users/getSearchedUsers", async({name, academic_formation, academic_institution}) =>{
     try {
        console.log("ACTION OK")
        let query = `http://localhost:3001/api/v1/search/users?name=${name}`
        if (academic_formation) query += `&academic_formation=${academic_formation}`
        if (academic_institution) query += `&academic_institution=${academic_institution}`
        console.log("Query: " + query)
        const searchedUsers = (await axios.get(query)).data
        console.log(searchedUsers);
        return searchedUsers;
     } catch (error) {
        throw new Error(error.message);
     }
})


const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        test:(state) =>{
            state.test = !state.test;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSearchedUsers.pending, (state) => {
                state.searchedUsers = []; //Esto queda vacío porque despues podemos poner que si searchedUsers.length === 0 muestre un símbolo de carga
            })
            .addCase(getSearchedUsers.fulfilled, (state, action)=>{
                state.searchedUsers = action.payload;
            })
            .addCase(getUserData.pending, () => {
                console.log("cargando");
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                state.user = action.payload
                console.log(action.payload);
            })
            .addCase(getUserData.rejected, (state, action) => {
                console.log(action);
            })
    }
})

export default usersSlice.reducer;

// export of the selectors of the global state
export {getSearchedUsers, getUserData};
export const {test} = usersSlice.actions;
export const selectAllUsers = (state) => state.users.allUsers;
export const selectSearchedUsers = (state) => state.users.searchedUsers;
export const selectStudents = (state) => state.users.students;
export const selectProfessionals = (state) => state.users.professionals;
export const selectCompanies = (state) => state.users.companies;