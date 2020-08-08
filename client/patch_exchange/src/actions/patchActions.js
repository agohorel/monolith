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
  GET_PATCH_BY_ID_LOADING,
  GET_PATCH_BY_ID_SUCCESS,
  GET_PATCH_BY_ID_FAILURE,
  ADD_VERSION_LOADING,
  ADD_VERSION_SUCCESS,
  ADD_VERSION_FAILURE,
  UPDATE_PATCH_LOADING,
  UPDATE_PATCH_SUCCESS,
  UPDATE_PATCH_FAILURE,
  UPDATE_VERSION_LOADING,
  UPDATE_VERSION_SUCCESS,
  UPDATE_VERSION_FAILURE,
  GET_PATCH_VERSIONS_LOADING,
  GET_PATCH_VERSIONS_SUCCESS,
  GET_PATCH_VERSIONS_FAILURE,
  GET_PATCH_VERSION_LOADING,
  GET_PATCH_VERSION_SUCCESS,
  GET_PATCH_VERSION_FAILURE,
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

export const createPatchVersion = (versionData) => async (dispatch) => {
  dispatch({ type: ADD_VERSION_LOADING });

  try {
    const res = await axios.post(
      `http://localhost:5000/api/patches/${versionData.patch_fk}/versions`,
      versionData
    );

    dispatch({ type: ADD_VERSION_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: ADD_VERSION_FAILURE, payload: error });
  }
};

export const searchPatch = (patchName) => async (dispatch) => {
  dispatch({ type: SEARCH_PATCH_LOADING });

  try {
    const res = await axios.get(
      `http://localhost:5000/api/patches/${patchName}/search`
    );

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

export const getPatchById = (patchID) => async (dispatch) => {
  dispatch({ type: GET_PATCH_BY_ID_LOADING });
  try {
    const res = await axios.get(`http://localhost:5000/api/patches/${patchID}`);
    dispatch({ type: GET_PATCH_BY_ID_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_PATCH_BY_ID_FAILURE, payload: error });
  }
};

export const updatePatch = (patchID, patchData) => async (dispatch) => {
  dispatch({ type: UPDATE_PATCH_LOADING });
  try {
    const res = await axios.put(
      `http://localhost:5000/api/patches/${patchID}`,
      patchData
    );
    dispatch({ type: UPDATE_PATCH_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: UPDATE_PATCH_FAILURE, payload: error });
  }
};

export const updateVersion = (versionData) => async (dispatch) => {
  dispatch({ type: UPDATE_VERSION_LOADING });
  try {
    const res = await axios.put(
      `http://localhost:5000/api/patches/versions/${versionData.version_id}/`,
      versionData
    );
    dispatch({ type: UPDATE_VERSION_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: UPDATE_VERSION_FAILURE, payload: error });
  }
};

export const getPatchVersions = (patchID) => async (dispatch) => {
  dispatch({ type: GET_PATCH_VERSIONS_LOADING });
  try {
    const res = await axios.get(
      `http://localhost:5000/api/patches/${patchID}/versions`
    );
    dispatch({ type: GET_PATCH_VERSIONS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_PATCH_VERSIONS_FAILURE, payload: error });
  }
};

export const getPatchVersion = (versionID) => async (dispatch) => {
  dispatch({ type: GET_PATCH_VERSION_LOADING });
  try {
    const res = await axios.get(
      `http://localhost:5000/api/patches/versions/${versionID}`
    );
    dispatch({ type: GET_PATCH_VERSION_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_PATCH_VERSION_FAILURE, payload: error });
  }
};
