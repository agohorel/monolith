import {
  UPLOAD_PATCH_LOADING,
  UPLOAD_PATCH_SUCCESS,
  UPLOAD_PATCH_FAILURE,
  UPLOAD_PATCH_IMG_LOADING,
  UPLOAD_PATCH_IMG_SUCCESS,
  UPLOAD_PATCH_IMG_FAILURE,
} from "../actions/types";

import { generateSha1, uploadFileWithRetries } from "../utils/b2.js";

export const uploadPatch = (os, file, user) => async (dispatch) => {
  dispatch({ type: UPLOAD_PATCH_LOADING });
  try {
    const hash = await generateSha1(file);
    const res = await uploadFileWithRetries(user, os, file, hash, 5);
    dispatch({ type: UPLOAD_PATCH_SUCCESS, payload: res?.data });
  } catch (error) {
    dispatch({ type: UPLOAD_PATCH_FAILURE, payload: error });
  }
};

export const uploadPatchImage = (file, user) => async (dispatch) => {
  dispatch({ type: UPLOAD_PATCH_IMG_LOADING });
  try {
    const hash = await generateSha1(file);
    const res = await uploadFileWithRetries(user, "image", file, hash, 5);
    dispatch({ type: UPLOAD_PATCH_IMG_SUCCESS, payload: res?.data });
  } catch (error) {
    console.error(error);
    dispatch({ type: UPLOAD_PATCH_IMG_FAILURE, payload: error });
  }
};
