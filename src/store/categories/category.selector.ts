import { createSelector } from "reselect";
import { CategoriesState } from "./category.reducer";
import { CategoryMap } from "./category.types";
import { RootState } from "../store";

// Selects the categories slice of the state
const selectCategoriesSlice = (state:RootState): CategoriesState => state.categories;

// Selector to get the array of categories
export const selectCategoriesArray = createSelector(
  [selectCategoriesSlice],
  (categoriesSlice) => categoriesSlice.categories
);

// Selector to transform the categories array into an object
export const selectCategoriesMap = createSelector(
  [selectCategoriesArray],
  (categoriesArray): CategoryMap =>
    categoriesArray.reduce((accumulator, category) => {
      const { title, items } = category;
      accumulator[title.toLowerCase()] = items;
      return accumulator;
    }, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoriesSlice],
  (categoriesSlice) => categoriesSlice.isLoading
);
