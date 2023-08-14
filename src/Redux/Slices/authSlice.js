import { createSlice } from "@reduxjs/toolkit";

// slice for setting admin/manager details globally
const authSlice = createSlice({
  name: "auth",
  initialState: null,
  reducers: {
    login: (state, action) => {
      return action.payload; // making initial state to loginDetails  = {id, name , email, isAdmin, token}
    },
    logout: (state, action) => {
      return null; // making initial state to null
    },
  },
});

//exporting the actions
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
