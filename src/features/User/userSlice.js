import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    token: null,
  },
  reducers: {
    login: (state, action) => {
      return { isLogin: true, token: action.payload };
    },
    loguot: (state, action) => {
      return {
        isLogin: false,
        token: null,
      };
    },
    getToken: (state, action) => {
      return { isLogin: true, token: action.payload.token };
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, loguot,getToken } = userSlice.actions;

export default userSlice.reducer;
