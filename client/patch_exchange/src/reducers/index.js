import { combineReducers } from "redux";

import { authReducer } from "../reducers/authReducer.js";
import { layoutReducer } from "../reducers/layoutReducer.js";

const rootReducer = combineReducers({
  auth: authReducer,
  layout: layoutReducer
});

export default rootReducer;
