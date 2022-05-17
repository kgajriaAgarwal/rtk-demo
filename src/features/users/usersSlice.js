import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "1", name: "karishma gajria Agarwal" },
  { id: "2", name: "Akash Agarwal" },
  { id: "3", name: "neha gajria" }
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {}
});

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;
