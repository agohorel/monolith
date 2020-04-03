import {
  META_LIST_LOADING,
  META_LIST_SUCCESS,
  META_LIST_FAILURE,
  ADD_PATCH_LOADING,
  ADD_PATCH_SUCCESS,
  ADD_PATCH_FAILURE
} from "../actions/types";

const intiialState = {
  loading: false,
  errors: false,
  metadataLists: {}
};

export const patchReducer = (state = intiialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case META_LIST_LOADING:
    case ADD_PATCH_LOADING:
      return {
        ...state,
        errors: null,
        loading: true
      };
    case META_LIST_SUCCESS:
    case ADD_PATCH_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: null,
        metadataLists: payload
      };
    case META_LIST_FAILURE:
    case ADD_PATCH_FAILURE:
      return {
        ...state,
        loading: false,
        errors: payload
      };
    default:
      return state;
  }
};
