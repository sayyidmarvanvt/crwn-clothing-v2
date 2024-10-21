import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  categories: [],
  isLoading: false,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: INITIAL_STATE,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload; 
    },
  },
});

export const { setCategories, setLoading } = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;
