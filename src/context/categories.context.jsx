import { createContext, useReducer, useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/reducer/reducer.utils";

// Create Categories Context
export const CategoriesContext = createContext({
  categories: {},
});

// Define Action Types for the reducer
export const CATEGORY_ACTION_TYPES = {
  SET_CATEGORIES: "SET_CATEGORIES",
};

// Categories reducer function to manage state updates
const categoriesReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORY_ACTION_TYPES.SET_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };

    default:
      throw new Error(`Unhandled action type: ${type} in categoriesReducer`);
  }
};

// Initial state for categories
const INITIAL_STATE = {
  categories: {},
};

// Categories Provider Component
export const CategoriesProvider = ({ children }) => {
  const [{ categories }, dispatch] = useReducer(
    categoriesReducer,
    INITIAL_STATE
  );

  // Function to set categories in the state
  const setCategories = (category) => {
    dispatch(createAction(CATEGORY_ACTION_TYPES.SET_CATEGORIES, category));
  };

  // Fetch categories data and set state
  useEffect(() => {
    const fetchCategories = async () => {
      const categoryData = await getCategoriesAndDocuments();
      setCategories(categoryData);
    };

    fetchCategories();
  }, []);

  // Provide categories and setCategories as context value
  const value = { categories, setCategories };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
