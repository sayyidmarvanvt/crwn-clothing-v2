import { takeLatest,all,call,put } from "redux-saga/effects";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { fetchCategoriesFailed,fetchCategoriesSuccess } from "./category.action";

import { CATEGORY_ACTION_TYPES } from "./category.types";



// Worker saga
export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCategoriesAndDocuments);
    yield put(fetchCategoriesSuccess(categoriesArray)); 
  } catch (error) {
    yield put(fetchCategoriesFailed(error)); 
  }
}

// Watcher saga: watches for 'FETCH_CATEGORIES_START' action
export function* onFetchCategoriesStart() {
  yield takeLatest(CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

// Root saga that runs all category-related sagas
export function* categoriesSaga() {
  yield all([call(onFetchCategoriesStart)]);
}