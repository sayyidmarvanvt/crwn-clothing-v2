import { createSelector } from "reselect";

// Selects the categories slice of the state
const selectCategoriesSlice = (state) => state.categories;

// Selector to get the array of categories
export const selectCategoriesArray = createSelector(
  [selectCategoriesSlice],
  (categoriesSlice) => categoriesSlice.categories
);

// Selector to transform the categories array into an object
export const selectCategoriesMap = createSelector(
  [selectCategoriesArray],
  (categoriesArray) =>
    categoriesArray.reduce((accumulator, category) => {
      const { title, items } = category;
      accumulator[title.toLowerCase()] = items;
      return accumulator;
    }, {})
);
