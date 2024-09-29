import { CATEGORY_ACTION_TYPES } from "./category.types";

// Initial state for categories
const INITIAL_STATE = {
  categories: [],
  isLoading: false,
  error: null,
};

// Categories reducer function to manage state updates
export const categoriesReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START:
      return {
        ...state,
        isLoading: true,
      };
    case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: payload,
        isLoading: false,
        error:null
      };
    case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        error: payload,
        isLoading:false
      };

    default:
      return state;
  }
};
