import { SIDEBAR_OPEN, SIDEBAR_CLOSE } from "../actions/types";

const initialState = {
  isSidebarOpen: false,
};

export const layoutReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case SIDEBAR_OPEN:
      return {
        ...state,
        isSidebarOpen: true,
      };
    case SIDEBAR_CLOSE:
      return {
        ...state,
        isSidebarOpen: false,
      };
    default:
      return state;
  }
};
