import {
  UPLOAD_PATCH_LOADING,
  UPLOAD_PATCH_SUCCESS,
  UPLOAD_PATCH_FAILURE,
  UPLOAD_PATCH_IMG_LOADING,
  UPLOAD_PATCH_IMG_SUCCESS,
  UPLOAD_PATCH_IMG_FAILURE,
  ADD_FILE_TO_UPLOAD,
  ADD_IMAGE_TO_UPLOAD,
  UPDATE_FILE_UPLOAD_PROGRESS,
} from "../actions/types";

import { generateSha1, uploadFileWithRetries } from "../utils/b2.js";

export const uploadPatch = (file, user) => async (dispatch) => {
  dispatch({ type: UPLOAD_PATCH_LOADING });
  try {
    const hash = await generateSha1(file.binary);
    const res = await uploadFileWithRetries(
      user,
      file.os,
      file.binary,
      hash,
      5
    );
    dispatch({ type: UPLOAD_PATCH_SUCCESS, payload: res?.data });
  } catch (error) {
    dispatch({ type: UPLOAD_PATCH_FAILURE, payload: error });
  }
};

export const uploadPatchImage = (file, user) => async (dispatch) => {
  dispatch({ type: UPLOAD_PATCH_IMG_LOADING });
  try {
    const hash = await generateSha1(file.binary);
    const res = await uploadFileWithRetries(
      user,
      "image",
      file.binary,
      hash,
      5
    );
    dispatch({ type: UPLOAD_PATCH_IMG_SUCCESS, payload: res?.data });
  } catch (error) {
    console.error(error);
    dispatch({ type: UPLOAD_PATCH_IMG_FAILURE, payload: error });
  }
};

export const addFile = (file) => (dispatch) => {
  dispatch({ type: ADD_FILE_TO_UPLOAD, payload: file });
};

export const addImage = (image) => (dispatch) => {
  dispatch({ type: ADD_IMAGE_TO_UPLOAD, payload: image });
};

export const updateFileUploadProgress = (file, percentCompleted) => (
  dispatch
) => {
  dispatch({
    type: UPDATE_FILE_UPLOAD_PROGRESS,
    payload: { file, progress: percentCompleted },
  });
};
