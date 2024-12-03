import { UnknownAction } from "redux";
import { UserData } from "../../utils/firebase/firebase.utils";
import {
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutStart,
  signOutSuccess,
  signUpFailed,
  signUpStart,
} from "./user.action";

export type UserState = {
  readonly isLoading: boolean;
  readonly error: Error | null;
  readonly currentUser: UserData | null;
};

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (state = INITIAL_STATE, action: UnknownAction) => {
  if (
    signInFailed.match(action) ||
    signOutFailed.match(action) ||
    signUpFailed.match(action)
  )
    return {
      ...state,
      error: action.payload,
      isLoading: false,
    };

  if (signInSuccess.match(action))
    return {
      ...state,
      currentUser: action.payload,
      isLoading: false,
      error: null,
    };

  if (signOutSuccess.match(action))
    return {
      ...state,
      currentUser: null,
      error: null,
      isLoading: false,
    };

  if (signOutStart.match(action) || signUpStart.match(action))
    return {
      ...state,
      isLoading: true,
      error: null,
    };

  return state;
};
