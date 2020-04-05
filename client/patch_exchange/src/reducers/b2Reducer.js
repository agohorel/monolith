import {
  UPLOAD_PATCH_LOADING,
  UPLOAD_PATCH_SUCCESS,
  UPLOAD_PATCH_FAILURE,
} from "../actions/types";

const initialState = {
  loading: false,
  errors: null,
  response: null,
};

export const b2Reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPLOAD_PATCH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case UPLOAD_PATCH_SUCCESS:
      return {
        ...state,
        loading: false,
        response: payload,
      };
    case UPLOAD_PATCH_FAILURE:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    default:
      return state;
  }
};
