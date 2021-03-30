import {
  TOGGLE_BOTTOM_NAV,
  CLOSE_BOTTOM_NAV,
  OPEN_BOTTOM_NAV,
} from '../constants/ui';

const initialState = {
  toggleBottomNav: false,
  element: '',
  title: '',
  icon: '',
};

const UIReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TOGGLE_BOTTOM_NAV:
      return {
        ...state,
        toggleBottomNav: !state.toggleBottomNav,
        element: payload.elmt,
        title: payload.title,
        icon: payload.icon,
      };
    case OPEN_BOTTOM_NAV:
      return {
        ...state,
        toggleBottomNav: true,
        element: payload.elmt,
        title: payload.title,
        icon: payload.icon,
      };
    case CLOSE_BOTTOM_NAV:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default UIReducer;
