import { SIDEBAR_TOGGLE } from "./types";

export const toggleSidebar = () => (dispatch) => {
  dispatch({ type: SIDEBAR_TOGGLE });
};
