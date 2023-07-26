import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allUsers: [],
    searchedUsers: [],
    students: [],
    professionals: [],
    companies: []
};





const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        searchUsers: (state, action) => {
            const searchTerm = action.payload.toLowerCase().trim();
            state.searchedUsers = state.allUsers.filter(user => {
                user.name.toLowerCase().includes(searchTerm)
            });
        }
    },
    
})

export default usersSlice.reducer;

// export of the selectors of the global state
export const selectAllUsers = (state) => state.users.allUsers;
export const selectSearchedUsers = (state) => state.users.searchedUsers;
export const selectStudents = (state) => state.users.students;
export const selectProfessionals = (state) => state.users.professionals;
export const selectCompanies = (state) => state.users.companies;