import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState, // Corrected typo here
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserStart: (state)=>{
      state.loading = true;
    },
    updateUserSucess: (state,action)=>{
state.currentUser = action.payload;
state.loading = false;
state.error = null
    },
    signOut:(state)=>{
      state.currentUser = null;
state.loading = false;
state.error = null
    }
  },
});

export const { signInStart, signInSuccess, signInFail,updateUserStart,updateUserSucess, signOut } = userSlice.actions;

export default userSlice.reducer;
