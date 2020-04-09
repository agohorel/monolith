import {
  UPLOAD_PATCH_LOADING,
  UPLOAD_PATCH_SUCCESS,
  UPLOAD_PATCH_FAILURE,
  UPLOAD_PATCH_IMG_LOADING,
  UPLOAD_PATCH_IMG_SUCCESS,
  UPLOAD_PATCH_IMG_FAILURE,
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
    case UPLOAD_PATCH_IMG_LOADING:
      return {
        ...state,
        loading: true,
      };
    case UPLOAD_PATCH_SUCCESS:
    case UPLOAD_PATCH_IMG_SUCCESS:
      return {
        ...state,
        loading: false,
        response: payload,
      };
    case UPLOAD_PATCH_FAILURE:
    case UPLOAD_PATCH_IMG_FAILURE:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    default:
      return state;
  }
};
