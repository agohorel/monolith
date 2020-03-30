import axios from "axios";

import {
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from "./types";

export const register = creds => async dispatch => {
  dispatch({ type: REGISTER_LOADING });

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
      creds
    );
    localStorage.setItem("patchex_token", res.data.token);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
  } catch (error) {
    console.error(error);
    dispatch({ type: REGISTER_FAILURE, payload: error });
  }
};

export const login = creds => async dispatch => {
  dispatch({ type: LOGIN_LOADING });

  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", creds);
    localStorage.setItem("patchex_token", res.data.token);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
  } catch (error) {
    console.error(error);
    dispatch({ type: LOGIN_FAILURE, payload: error });
  }
};
