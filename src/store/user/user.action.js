import { createUserDocumentFromAuth, onAuthStateChangedListener } from "../../utils/firebase/firebase.utils";
import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";

export const fetchCurrentUser = () => async (dispatch) => {
  const unsubscribe = onAuthStateChangedListener(async (user) => {
    if (user) {
      await createUserDocumentFromAuth(user);
    }
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  });
  return unsubscribe;
};
