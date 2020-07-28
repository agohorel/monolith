import axios from "axios";
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
  GET_PATCH_BY_NAME_LOADING,
  GET_PATCH_BY_NAME_SUCCESS,
  GET_PATCH_BY_NAME_FAILURE,
} from "./types";

export const fetchMetadataLists = () => async (dispatch) => {
  dispatch({ type: META_LIST_LOADING });
  try {
    const res = await axios.get(
      "http://localhost:5000/api/patches/metadata-lists"
    );
    dispatch({ type: META_LIST_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: META_LIST_FAILURE,
      payload: "Failed to fetch patch metadata categories",
    });
  }
};

export const createPatch = (patchData) => async (dispatch) => {
  dispatch({ type: ADD_PATCH_LOADING });

  console.log(patchData);

  try {
    const res = await axios.post(
      "http://localhost:5000/api/patches/add-patch",
      patchData
    );
    dispatch({ type: ADD_PATCH_SUCCESS, payload: res.data });
  } catch (error) {
    console.error(error);
    dispatch({ type: ADD_PATCH_FAILURE, payload: error });
  }
};

export const searchPatch = (patchName) => async (dispatch) => {
  dispatch({ type: SEARCH_PATCH_LOADING });

  try {
    const res = await axios.get(
      `http://localhost:5000/api/patches/${patchName}`
    );

    console.log(res.data);

    dispatch({ type: SEARCH_PATCH_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: SEARCH_PATCH_FAILURE, payload: error });
  }
};

export const fetchUserPatches = (userID) => async (dispatch) => {
  dispatch({ type: FETCH_USER_PATCHES_LOADING });

  try {
    const res = await axios.get(
      `http://localhost:5000/api/patches/?userID=${userID}`
    );
    dispatch({ type: FETCH_USER_PATCHES_SUCCESS, payload: res.data.patches });
  } catch (error) {
    dispatch({ type: FETCH_USER_PATCHES_FAILURE, payload: error });
  }
};

export const getPatchByName = (patchName) => async (dispatch) => {
  dispatch({ type: GET_PATCH_BY_NAME_LOADING });
  try {
    const res = await axios.get(`http://localhost:5000/api${patchName}`);
    dispatch({ type: GET_PATCH_BY_NAME_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_PATCH_BY_NAME_FAILURE, payload: error });
  }
};
