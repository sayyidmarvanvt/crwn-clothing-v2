import { CATEGORY_ACTION_TYPES } from "./category.types";

// Initial state for categories
const INITIAL_STATE = {
  categories: [],
};

// Categories reducer function to manage state updates
export const categoriesReducer = (state = INITIAL_STATE, action={} ) => {
  const { type, payload } = action;    
  switch (type) {
    case CATEGORY_ACTION_TYPES.SET_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };

    default:
      return state;
  }
};
