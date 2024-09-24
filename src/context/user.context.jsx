import { createContext, useReducer, useEffect } from "react";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/reducer/reducer.utils";

// Create User Context
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// Action Types for User Reducer
export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

// User Reducer function to handle state updates
const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };

    default:
      throw new Error(`Unhandled action type: ${type} in userReducer`);
  }
};

// Initial state for user
const INITIAL_STATE = {
  currentUser: null,
};

// User Provider Component
export const UserProvider = ({ children }) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

  // Function to set the current user in the state
  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  };

  // Value passed to the context consumers
  const value = { currentUser, setCurrentUser };

  // Effect to handle authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        await createUserDocumentFromAuth(user); // Create user document if user exists
      }
      setCurrentUser(user); // Update state with the current user
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
