// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  firstName: "",
  image: "",
  lastName: "",
  _id: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      state._id = action.payload.data._id;
      state.firstName = action.payload.data.firstName;
      state.lastName = action.payload.data.lastName;
      state.email = action.payload.data.email;
      state.image = action.payload.data.image;

      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify(action.payload.data));
    },
    logoutRedux: (state) => {
      state._id = "";
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.image = "";

      // Remove user data from localStorage
      localStorage.removeItem("user");
    },
  },
});

export const { loginRedux, logoutRedux } = userSlice.actions;

export default userSlice.reducer;
