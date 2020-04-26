import { SIDEBAR_TOGGLE } from "../actions/types";

const initialState = {
  isSidebarOpen: true,
};

export const layoutReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case SIDEBAR_TOGGLE:
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };
    default:
      return state;
  }
};
