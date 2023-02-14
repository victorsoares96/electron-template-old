import {
  combineReducers
} from "redux";
import {
  configureStore,
  getDefaultMiddleware
} from "@reduxjs/toolkit";
import {
  createHashHistory
} from "history";
import {
  createReduxHistoryContext
} from "redux-first-history";
// @ts-ignore
import undoable from "easy-redux-undo";
import homeReducer from "./home/home.slice";
import counterReducer from "./counter/counter.slice";
import complexReducer from "./complex/complex.slice";

const {
  routerMiddleware,
  createReduxHistory,
  routerReducer
} = createReduxHistoryContext({
  history: createHashHistory()
});

export const store = configureStore({
  reducer: combineReducers({
    router: routerReducer,
    home: homeReducer,
    undoable: undoable(
      combineReducers({
        counter: counterReducer,
        complex: complexReducer
      })
    )
  }),
  middleware: [...getDefaultMiddleware({
    serializableCheck: false
  }), routerMiddleware]
});

export const history = createReduxHistory(store);