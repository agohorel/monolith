import axios from "axios";
import {
  META_LIST_LOADING,
  META_LIST_SUCCESS,
  META_LIST_FAILURE,
  ADD_PATCH_LOADING,
  ADD_PATCH_SUCCESS,
  ADD_PATCH_FAILURE,
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
    dispatch({ type: ADD_PATCH_FAILURE, payload: error });
  }
};
