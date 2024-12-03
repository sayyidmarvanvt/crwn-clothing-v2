import { UnknownAction } from "redux";
import { Category} from "./category.types";
import {
  fetchCategoriesFailed,
  fetchCategoriesStart,
  fetchCategoriesSuccess,
} from "./category.action";

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

// Initial state for categories
const INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

// Categories reducer function to manage state updates
export const categoriesReducer = (
  state = INITIAL_STATE,
  action : UnknownAction
) => {
  if (fetchCategoriesStart.match(action))
    return {
      ...state,
      isLoading: true,
    };
  if (fetchCategoriesSuccess.match(action))
    return {
      ...state,
      categories: action.payload,
      isLoading: false,
      error: null,
    };
  if (fetchCategoriesFailed.match(action))
    return {
      ...state,
      error: action.payload,
      isLoading: false,
    };

  return state;
};
