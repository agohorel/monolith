import { SIDEBAR_OPEN, SIDEBAR_CLOSE } from "./types";

export const openSidebar = () => dispatch => {
  dispatch({ type: SIDEBAR_OPEN });
};

export const closeSidebar = () => dispatch => {
  dispatch({ type: SIDEBAR_CLOSE });
};
