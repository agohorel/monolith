import axios from "axios";
import {
  META_LIST_LOADING,
  META_LIST_SUCCESS,
  META_LIST_FAILURE
} from "./types";

export const fetchMetadataLists = () => async dispatch => {
  dispatch({ type: META_LIST_LOADING });
  try {
    const res = await axios.get(
      "http://localhost:5000/api/patches/metadata-lists"
    );
    dispatch({ type: META_LIST_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: META_LIST_FAILURE,
      payload: "Failed to fetch patch metadata categories"
    });
  }
};
