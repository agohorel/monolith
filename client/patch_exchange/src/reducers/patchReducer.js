import {
  META_LIST_LOADING,
  META_LIST_SUCCESS,
  META_LIST_FAILURE,
  ADD_PATCH_LOADING,
  ADD_PATCH_SUCCESS,
  ADD_PATCH_FAILURE,
  SEARCH_PATCH_LOADING,
  SEARCH_PATCH_SUCCESS,
  SEARCH_PATCH_FAILURE,
  FETCH_USER_PATCHES_LOADING,
  FETCH_USER_PATCHES_SUCCESS,
  FETCH_USER_PATCHES_FAILURE,
  GET_PATCH_BY_ID_LOADING,
  GET_PATCH_BY_ID_SUCCESS,
  GET_PATCH_BY_ID_FAILURE,
  SELECT_PATCH,
  ADD_VERSION_LOADING,
  ADD_VERSION_SUCCESS,
  ADD_VERSION_FAILURE,
} from "../actions/types";

const initialState = {
  loading: false,
  errors: false,
  metadataLists: {},
  searchResult: {},
  userPatches: [],
  selectedPatch: {},
};

export const patchReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case META_LIST_LOADING:
    case ADD_PATCH_LOADING:
    case SEARCH_PATCH_LOADING:
    case FETCH_USER_PATCHES_LOADING:
    case GET_PATCH_BY_ID_LOADING:
    case ADD_VERSION_LOADING:
      return {
        ...state,
        errors: null,
        loading: true,
      };

    case META_LIST_SUCCESS:
    case ADD_PATCH_SUCCESS:
      return {
        ...state,
        loading: false,
        errors: null,
        metadataLists: payload,
      };

    case SEARCH_PATCH_SUCCESS:
      return {
        ...state,
        loading: false,
        searchResult: payload,
      };

    case FETCH_USER_PATCHES_SUCCESS:
      return {
        ...state,
        userPatches: payload,
      };

    case GET_PATCH_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedPatch: payload,
      };

    case SELECT_PATCH:
      return {
        ...state,
        selectedPatch: payload,
      };

    case ADD_VERSION_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case META_LIST_FAILURE:
    case ADD_PATCH_FAILURE:
    case SEARCH_PATCH_FAILURE:
    case FETCH_USER_PATCHES_FAILURE:
    case GET_PATCH_BY_ID_FAILURE:
    case ADD_VERSION_FAILURE:
      return {
        ...state,
        loading: false,
        errors: payload,
      };

    default:
      return state;
  }
};
