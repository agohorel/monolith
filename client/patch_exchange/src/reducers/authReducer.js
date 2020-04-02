import {
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "../actions/types.js";

const initialState = {
  loading: false,
  user: null,
  errors: null
};

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_LOADING:
    case LOGIN_LOADING:
      return {
        ...state,
        loading: true
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload,
        errors: null
      };
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        user: null,
        errors: payload
      };
    default:
      return state;
  }
};
