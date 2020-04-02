import {
  META_LIST_LOADING,
  META_LIST_SUCCESS,
  META_LIST_FAILURE
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
      return {
        ...state,
        errors: null,
        loading: true
      };
    case META_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: null,
        metadataLists: payload
      };
    case META_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        errors: payload
      };
    default:
      return state;
  }
};
