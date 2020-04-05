import { combineReducers } from "redux";

import { authReducer } from "../reducers/authReducer.js";
import { layoutReducer } from "../reducers/layoutReducer.js";
import { patchReducer } from "../reducers/patchReducer.js";
import { b2Reducer } from "../reducers/b2Reducer.js";

const rootReducer = combineReducers({
  auth: authReducer,
  layout: layoutReducer,
  patches: patchReducer,
  b2: b2Reducer,
});

export default rootReducer;
