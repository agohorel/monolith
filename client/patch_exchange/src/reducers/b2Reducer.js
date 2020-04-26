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

const initialState = {
  loading: false,
  errors: null,
  response: null,
  fileList: [],
};

export const b2Reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPLOAD_PATCH_LOADING:
    case UPLOAD_PATCH_IMG_LOADING:
      return {
        ...state,
        loading: true,
      };
    case UPLOAD_PATCH_SUCCESS:
    case UPLOAD_PATCH_IMG_SUCCESS:
      return {
        ...state,
        loading: false,
        response: payload,
      };
    case UPLOAD_PATCH_FAILURE:
    case UPLOAD_PATCH_IMG_FAILURE:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    case ADD_FILE_TO_UPLOAD:
      return {
        ...state,
        fileList: [...state.fileList, payload],
      };
    case ADD_IMAGE_TO_UPLOAD:
      return {
        ...state,
        fileList: [...state.fileList, payload],
      };
    case UPDATE_FILE_UPLOAD_PROGRESS:
      return {
        ...state,
        fileList: state.fileList.map((f) => {
          if (f.binary.name === payload.file) {
            return {
              ...f,
              progress: payload.progress,
            };
          }
          return f;
        }),
      };

    default:
      return state;
  }
};
