import { combineReducers } from "redux";

import { authReducer } from "../reducers/authReducer.js";
import { layoutReducer } from "../reducers/layoutReducer.js";
import { patchReducer } from "../reducers/patchReducer.js";

const rootReducer = combineReducers({
  auth: authReducer,
  layout: layoutReducer,
  patches: patchReducer
});

export default rootReducer;
