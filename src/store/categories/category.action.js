import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORY_ACTION_TYPES } from "./category.types";


export const fetchCategoriesAsync =()=> async (dispatch) => {
  const categoriesArray = await getCategoriesAndDocuments();
  dispatch(createAction(CATEGORY_ACTION_TYPES.SET_CATEGORIES, categoriesArray));
};
