import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

// Import Reducers and Sagas
import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";

// Create Saga Middleware
const sagaMiddleware = createSagaMiddleware();

// Configure Middleware
const middleware = [
  process.env.NODE_ENV !== "production" && logger, 
  sagaMiddleware,
].filter(Boolean);

// Redux DevTools Enhancer
const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// Apply Middleware and Enhancers
const composedEnhancers = composeEnhancer(applyMiddleware(...middleware));

// Persist Configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], 
};

// Create Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Redux Store
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

// Create Persistor
export const persistor = persistStore(store);

// Run Saga Middleware
sagaMiddleware.run(rootSaga);
