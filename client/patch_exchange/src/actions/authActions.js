import axios from "axios";

import {
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from "./types";

export const register = (creds, history) => async (dispatch) => {
  dispatch({ type: REGISTER_LOADING });

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
      creds
    );
    localStorage.setItem("patchex_user", JSON.stringify(res.data));
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    history.push("/my-patches");
  } catch (error) {
    console.error(error);
    dispatch({ type: REGISTER_FAILURE, payload: error });
  }
};

export const login = (creds, history) => async (dispatch) => {
  dispatch({ type: LOGIN_LOADING });

  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", creds);
    localStorage.setItem("patchex_user", JSON.stringify(res.data));
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    history.push("/my-patches");
  } catch (error) {
    console.error(error);
    dispatch({ type: LOGIN_FAILURE, payload: "Invalid credentials" });
  }
};

export const logout = (history) => (dispatch) => {
  try {
    history.push("/login");
    localStorage.removeItem("patchex_user");
    dispatch({ type: LOGOUT_SUCCESS, payload: "Successfully logged out" });
  } catch (error) {
    dispatch({ type: LOGOUT_FAILURE, payload: "Error logging out" });
  }
};
