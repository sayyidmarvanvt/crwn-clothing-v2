import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,Middleware
} from "redux";
import { persistStore, persistReducer,PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

// Import Reducers and Sagas
import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";

export type RootState=ReturnType<typeof rootReducer>

declare global{
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

// Create Saga Middleware
const sagaMiddleware = createSagaMiddleware();

// Configure Middleware
const middleware = [
  process.env.NODE_ENV !== "production" && logger, 
  sagaMiddleware,
].filter((middleware):middleware is Middleware=>Boolean(middleware));

// Redux DevTools Enhancer
const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// Apply Middleware and Enhancers
const composedEnhancers = composeEnhancer(applyMiddleware(...middleware));

type ExtendedPersistConfig=PersistConfig<RootState> & {
  whitelist: (keyof RootState)[]
}

// Persist Configuration
const persistConfig:ExtendedPersistConfig = {
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
