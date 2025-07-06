import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string;
  fullname: string;
  email: string;
  role: "farmer" | "broker" | "";
  location: string;
}

const initialState: UserState = {
  id: "",
  fullname: "",
  email: "",
  role: "",
  location: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
