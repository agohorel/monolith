import {
  UPLOAD_PATCH_LOADING,
  UPLOAD_PATCH_SUCCESS,
  UPLOAD_PATCH_FAILURE,
} from "../actions/types";

import { uploadFile, generateSha1 } from "../utils/b2.js";

export const uploadPatch = (file, user) => async (dispatch) => {
  dispatch({ type: UPLOAD_PATCH_LOADING });
  try {
    const hash = await generateSha1(file);
    const res = uploadFile(user, file, hash);
    dispatch({ type: UPLOAD_PATCH_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: UPLOAD_PATCH_FAILURE, payload: error });
  }
};
