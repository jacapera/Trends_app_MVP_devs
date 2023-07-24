import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allUser: [],
    students: [],
    professionals: [],
    companies: []
};
const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {

    },
    
})

export default usersSlice.reducer;

// export of the selectors of the global state
export const selectAllUsers = (state) => state.users.allUsers;
export const selectStudents = (state) => state.users.students;
export const selectProfessionals = (state) => state.users.professionals;
export const selectCompanies = (state) => state.users.companies;